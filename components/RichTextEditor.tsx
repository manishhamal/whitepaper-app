import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'color', 'background',
        'align',
        'link', 'image'
    ];

    return (
        <div className="rich-text-editor">
            <style>{`
                .rich-text-editor .ql-container {
                    min-height: 300px;
                    max-height: 500px;
                    overflow-y: auto;
                    font-size: 16px;
                    background-color: white;
                    color: #1e293b;
                }
                .dark .rich-text-editor .ql-container {
                    background-color: #1e293b;
                    color: #e2e8f0;
                }
                .rich-text-editor .ql-editor {
                    min-height: 300px;
                }
                .rich-text-editor .ql-toolbar {
                    background-color: #f8fafc;
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .dark .rich-text-editor .ql-toolbar {
                    background-color: #1e293b;
                    border-bottom-color: #475569;
                }
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                }
                .rich-text-editor .ql-stroke {
                    stroke: #475569;
                }
                .dark .rich-text-editor .ql-stroke {
                    stroke: #94a3b8;
                }
                .rich-text-editor .ql-fill {
                    fill: #475569;
                }
                .dark .rich-text-editor .ql-fill {
                    fill: #94a3b8;
                }
                .rich-text-editor .ql-picker-label {
                    color: #475569;
                }
                .dark .rich-text-editor .ql-picker-label {
                    color: #94a3b8;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #94a3b8;
                    font-style: normal;
                }
                .dark .rich-text-editor .ql-editor.ql-blank::before {
                    color: #64748b;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || "Write your article content here..."}
                className="border rounded dark:border-slate-600"
            />
        </div>
    );
};

export default RichTextEditor;
