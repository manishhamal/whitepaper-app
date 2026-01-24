import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const execCommand = (command: string, value?: string) => {
        // Ensure editor has focus before executing command
        if (editorRef.current) {
            editorRef.current.focus();
            // Ensure there's a selection or create one
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
                // If no selection, ensure we're in the editor
                const range = document.createRange();
                range.selectNodeContents(editorRef.current);
                range.collapse(false); // Collapse to end
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
        document.execCommand(command, false, value);
        updateContent();
        editorRef.current?.focus();
    };

    const insertList = (ordered: boolean) => {
        if (!editorRef.current) return;

        editorRef.current.focus();
        const selection = window.getSelection();

        // If editor is empty, add content first
        if (!editorRef.current.textContent || editorRef.current.textContent.trim() === '') {
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            editorRef.current.appendChild(p);
            const range = document.createRange();
            range.setStart(p, 0);
            range.setEnd(p, 0);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }

        // Try execCommand first
        const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
        const success = document.execCommand(command, false, undefined);

        if (!success) {
            // Fallback: manually create list
            let range: Range;
            if (selection && selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            } else {
                range = document.createRange();
                range.selectNodeContents(editorRef.current);
                range.collapse(false);
            }

            // Get the current paragraph or create one
            let targetElement: HTMLElement | null = null;
            let container = range.commonAncestorContainer;

            if (container.nodeType === Node.TEXT_NODE && container.parentElement) {
                container = container.parentElement;
            }

            // Find paragraph or div
            let node: Node | null = container;
            while (node && node !== editorRef.current) {
                if (node instanceof HTMLElement && ['P', 'DIV'].includes(node.tagName)) {
                    targetElement = node;
                    break;
                }
                node = node.parentElement;
            }

            if (!targetElement) {
                targetElement = document.createElement('p');
                targetElement.innerHTML = '<br>';
                if (range.collapsed) {
                    range.insertNode(targetElement);
                } else {
                    const contents = range.extractContents();
                    targetElement.appendChild(contents);
                    range.insertNode(targetElement);
                }
            }

            // Create list
            const list = document.createElement(ordered ? 'ol' : 'ul');
            const li = document.createElement('li');
            li.innerHTML = targetElement.innerHTML || '<br>';
            list.appendChild(li);

            targetElement.parentNode?.replaceChild(list, targetElement);

            // Set cursor in list item
            const newRange = document.createRange();
            newRange.setStart(li, 0);
            newRange.setEnd(li, 0);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
        }

        updateContent();
        editorRef.current.focus();
    };

    const updateContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        updateContent();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');

        if (html) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const fragment = document.createDocumentFragment();
                while (tempDiv.firstChild) {
                    fragment.appendChild(tempDiv.firstChild);
                }
                range.insertNode(fragment);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        } else {
            document.execCommand('insertText', false, text);
        }
        updateContent();
    };

    const setFontSize = (size: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // If text is selected, wrap it in a span with the font size
                if (!range.collapsed) {
                    try {
                        const span = document.createElement('span');
                        span.style.fontSize = size;
                        // Use vertical-align to minimize line height impact
                        span.style.verticalAlign = 'baseline';
                        // Set line-height to match font size to minimize vertical expansion
                        span.style.lineHeight = size;
                        const contents = range.extractContents();
                        span.appendChild(contents);
                        range.insertNode(span);
                        // Select the newly inserted span
                        range.setStartBefore(span);
                        range.setEndAfter(span);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } catch (e) {
                        // Fallback: use execCommand
                        document.execCommand('fontSize', false, '7');
                        const selected = editorRef.current.querySelector('font[size="7"]');
                        if (selected) {
                            const span = document.createElement('span');
                            span.style.fontSize = size;
                            span.style.verticalAlign = 'baseline';
                            span.style.lineHeight = size;
                            span.innerHTML = selected.innerHTML;
                            selected.parentNode?.replaceChild(span, selected);
                        }
                    }
                } else {
                    // No selection - insert a span at cursor position for future text
                    try {
                        const span = document.createElement('span');
                        span.style.fontSize = size;
                        span.style.verticalAlign = 'baseline';
                        span.style.lineHeight = size;
                        span.innerHTML = '\u200B'; // Zero-width space
                        range.insertNode(span);
                        // Move cursor inside the span
                        range.setStart(span, 1);
                        range.setEnd(span, 1);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } catch (e) {
                        // Fallback: use styleWithCSS if available
                        document.execCommand('styleWithCSS', false, 'true');
                        document.execCommand('fontSize', false, '7');
                        const selected = editorRef.current.querySelector('font[size="7"]');
                        if (selected) {
                            (selected as HTMLElement).style.fontSize = size;
                            (selected as HTMLElement).style.verticalAlign = 'baseline';
                            (selected as HTMLElement).style.lineHeight = size;
                            selected.removeAttribute('size');
                        }
                    }
                }
                updateContent();
                editorRef.current.focus();
            } else {
                // No selection at all - create a range at the end
                const range = document.createRange();
                range.selectNodeContents(editorRef.current);
                range.collapse(false);
                const span = document.createElement('span');
                span.style.fontSize = size;
                span.style.verticalAlign = 'baseline';
                span.style.lineHeight = size;
                span.innerHTML = '\u200B';
                range.insertNode(span);
                const newRange = document.createRange();
                newRange.setStart(span, 1);
                newRange.collapse(true);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(newRange);
                updateContent();
                editorRef.current.focus();
            }
        }
    };

    const setTextColor = (color: string) => {
        execCommand('foreColor', color);
    };

    const setBackgroundColor = (color: string) => {
        execCommand('backColor', color);
    };

    return (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.375rem', backgroundColor: 'white' }} className="dark:border-slate-600 dark:bg-slate-800">
            {/* TOOLBAR - This should be visible at the top */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    padding: '8px',
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    minHeight: '48px',
                    alignItems: 'center'
                }}
                className="dark:border-slate-600 dark:bg-slate-800"
            >
                {/* Bold */}
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                    title="Bold"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Bold size={18} />
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 italic"
                    title="Italic"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Italic size={18} />
                </button>

                {/* Underline */}
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 underline"
                    title="Underline"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Underline size={18} />
                </button>

                <div style={{ width: '1px', backgroundColor: '#cbd5e1', margin: '0 4px', height: '24px' }} className="dark:bg-slate-600"></div>

                {/* Font Size */}
                <select
                    value=""
                    onChange={(e) => {
                        e.stopPropagation();
                        const size = e.target.value;
                        if (size) {
                            // Use setTimeout to ensure dropdown closes before applying font size
                            setTimeout(() => {
                                setFontSize(size);
                                // Reset dropdown value after applying
                                e.target.value = '';
                            }, 0);
                        }
                    }}
                    onMouseDown={(e) => {
                        // Don't prevent default - allow dropdown to open
                        e.stopPropagation();
                    }}
                    style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', cursor: 'pointer' }}
                    className="dark:bg-slate-700 dark:border-slate-600"
                    title="Font Size"
                >
                    <option value="">Size</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                    <option value="32px">32px</option>
                </select>

                {/* Text Color */}
                <input
                    type="color"
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: '40px', height: '40px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    title="Text Color"
                    onMouseDown={(e) => e.preventDefault()}
                />

                {/* Background Color */}
                <input
                    type="color"
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    style={{ width: '40px', height: '40px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    title="Background Color"
                    onMouseDown={(e) => e.preventDefault()}
                />

                <div style={{ width: '1px', backgroundColor: '#cbd5e1', margin: '0 4px', height: '24px' }} className="dark:bg-slate-600"></div>

                {/* Alignment */}
                <button
                    type="button"
                    onClick={() => execCommand('justifyLeft')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Align Left"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyCenter')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Align Center"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyRight')}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Align Right"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignRight size={18} />
                </button>

                <div style={{ width: '1px', backgroundColor: '#cbd5e1', margin: '0 4px', height: '24px' }} className="dark:bg-slate-600"></div>

                {/* Lists */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        insertList(false);
                    }}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Bullet List"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        insertList(true);
                    }}
                    style={{ padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Numbered List"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ListOrdered size={18} />
                </button>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={() => {
                    setIsFocused(false);
                    updateContent();
                }}
                onFocus={() => setIsFocused(true)}
                onPaste={handlePaste}
                style={{
                    padding: '16px',
                    minHeight: '300px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#0f172a',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}
                className="rich-text-content dark:bg-slate-700 dark:text-slate-100"
                data-placeholder={placeholder || "Write your article content here..."}
            />
            <style>{`
                .rich-text-content ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                    margin: 1rem 0 !important;
                }
                .rich-text-content ol {
                    list-style-type: decimal !important;
                    padding-left: 1.5rem !important;
                    margin: 1rem 0 !important;
                }
                .rich-text-content li {
                    display: list-item !important;
                }
                [contenteditable][data-placeholder]:empty:before {
                    content: attr(data-placeholder);
                    color: #94a3b8;
                    pointer-events: none;
                }
                [contenteditable][data-placeholder]:empty:focus:before {
                    content: '';
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
