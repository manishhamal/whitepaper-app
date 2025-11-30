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
        document.execCommand(command, false, value);
        updateContent();
        editorRef.current?.focus();
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
            // Paste HTML content preserving formatting
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
            // Fallback to plain text
            document.execCommand('insertText', false, text);
        }
        updateContent();
    };

    const setFontSize = (size: string) => {
        execCommand('fontSize', '7'); // This sets a base size, we'll use CSS
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedText = range.extractContents();
                const span = document.createElement('span');
                span.style.fontSize = size;
                span.appendChild(selectedText);
                range.insertNode(span);
                updateContent();
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
        <div className="border rounded dark:border-slate-600 bg-white dark:bg-slate-800">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                {/* Text Formatting */}
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold"
                    title="Bold"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded italic"
                    title="Italic"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded underline"
                    title="Underline"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Underline size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>

                {/* Font Size */}
                <select
                    onChange={(e) => {
                        const size = e.target.value;
                        if (size) {
                            setFontSize(size);
                            e.target.value = '';
                        }
                    }}
                    className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600 text-sm"
                    title="Font Size"
                    onMouseDown={(e) => e.preventDefault()}
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
                <div className="relative">
                    <input
                        type="color"
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 p-1 border rounded cursor-pointer"
                        title="Text Color"
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>

                {/* Background Color */}
                <div className="relative">
                    <input
                        type="color"
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-10 h-10 p-1 border rounded cursor-pointer"
                        title="Background Color"
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>

                {/* Alignment */}
                <button
                    type="button"
                    onClick={() => execCommand('justifyLeft')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Align Left"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyCenter')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Align Center"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('justifyRight')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Align Right"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <AlignRight size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Bullet List"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Numbered List"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ListOrdered size={18} />
                </button>
            </div>

            {/* Editor */}
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
                className={`p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    !value && !isFocused ? 'text-slate-400' : ''
                }`}
                style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}
                data-placeholder={placeholder || "Write your article content here..."}
            />
            <style>{`
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
