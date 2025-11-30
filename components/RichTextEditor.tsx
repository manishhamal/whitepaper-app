import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Heading3, Quote, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Underline,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    // Update editor content when value prop changes
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <div className="border rounded dark:border-slate-600 p-4 min-h-[300px] bg-white dark:bg-slate-700">
                <div className="text-slate-500">Loading editor...</div>
            </div>
        );
    }

    return (
        <div className="border rounded dark:border-slate-600 bg-white dark:bg-slate-800">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                {/* Headings */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Heading 1"
                >
                    <Heading1 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Heading 2"
                >
                    <Heading2 size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Heading 3"
                >
                    <Heading3 size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                
                {/* Text Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded font-bold ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded italic ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded underline ${editor.isActive('underline') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Underline"
                >
                    <Underline size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('strike') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Strikethrough"
                >
                    <Strikethrough size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                
                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('blockquote') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Blockquote"
                >
                    <Quote size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                
                {/* Alignment */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Align Left"
                >
                    <AlignLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Align Center"
                >
                    <AlignCenter size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Align Right"
                >
                    <AlignRight size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                
                {/* Links and Images */}
                <button
                    type="button"
                    onClick={setLink}
                    className={`p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded ${editor.isActive('link') ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                    title="Insert Link"
                >
                    <LinkIcon size={18} />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    title="Insert Image"
                >
                    <ImageIcon size={18} />
                </button>
                <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                
                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                >
                    <Undo size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                >
                    <Redo size={18} />
                </button>
            </div>

            {/* Editor */}
            <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
