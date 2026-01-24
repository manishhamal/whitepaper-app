import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const TranslationHelper: React.FC = () => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        // Load content from localStorage to avoid URL length limits
        const storedContent = localStorage.getItem('translation_helper_content');
        if (storedContent) {
            setContent(storedContent);
        }
    }, []);

    return (
        <div className="min-h-screen bg-white p-8 font-sans text-slate-900">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 instructions-panel">
                    <h1 className="text-xl font-bold mb-4">Translation Helper Tool</h1>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Right-click</strong> anywhere on this white page.</li>
                        <li>Select <strong>"Translate to Nepali"</strong> (or your target language).</li>
                        <li>Wait for the text below to change language.</li>
                        <li><strong>Select and Copy</strong> the translated article text below (do not copy these instructions).</li>
                        <li>Close this tab and <strong>Paste</strong> result into your Admin Dashboard.</li>
                    </ol>
                    <p className="mt-4 text-sm text-blue-700">
                        * If translation option doesn't appear, look for the Translate icon <span className="inline-block bg-white px-1 rounded border">文</span> in your browser's address bar.
                    </p>
                </div>

                <div className="mb-8 flex justify-between items-center instructions-panel">
                    <button
                        onClick={() => window.close()}
                        className="flex items-center text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Close Helper
                    </button>

                    <button
                        onClick={() => {
                            const contentDiv = document.getElementById('content-to-translate');
                            if (contentDiv) {
                                // Get the inner HTML which should now be translated by the browser
                                const translatedHtml = contentDiv.innerHTML;

                                // Copy to clipboard
                                navigator.clipboard.writeText(translatedHtml).then(() => {
                                    alert('Translated content copied! You can now paste it in the Admin Dashboard.');
                                }).catch(err => {
                                    console.error('Failed to copy:', err);
                                    alert('Failed to copy automatically. Please select and copy manually.');
                                });
                            }
                        }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors font-medium"
                    >
                        <span>📋 Copy Translated Content</span>
                    </button>
                </div>
                <div className="text-right mb-2 instructions-panel">
                    <span className="text-xs text-slate-400">Content loaded from Admin Dashboard</span>
                </div>

                <hr className="my-8 border-slate-200 instructions-panel" />

                {/* The Content Area - This is what gets translated */}
                <div
                    id="content-to-translate"
                    className="prose prose-lg max-w-none"
                    // Helper logic detects lang=en to offer translation
                    lang="en"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div >
    );
};

export default TranslationHelper;
