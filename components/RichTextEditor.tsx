import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Heading1, Heading2, Heading3 } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        updateContent();
    };

    const updateContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    return (
        <div className="border rounded dark:border-slate-600">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', '<h1>')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', '<h2>')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', '<h3>')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold"
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded italic"
                    title="Italic"
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded underline"
                    title="Underline"
                >
                    U
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Insert Link"
                >
                    <LinkIcon size={18} />
                </button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={updateContent}
                onBlur={updateContent}
                className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none prose prose-slate dark:prose-invert max-w-none"
                style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}
                dangerouslySetInnerHTML={{ __html: value || '' }}
            />
        </div>
    );
};

export default RichTextEditor;
