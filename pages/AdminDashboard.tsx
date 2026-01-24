import React, { useState, useEffect } from 'react';
import { supabase } from '../src/lib/supabase';
import { articleService } from '../src/services/articleService';
import { Article, Category } from '../types';
import { Loader2, Plus, Pencil, Trash2, Upload, LogOut, Save, X } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

const AdminDashboard: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);

    // Dashboard State
    const [articles, setArticles] = useState<Article[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [authorAvatarFile, setAuthorAvatarFile] = useState<File | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (session) fetchArticles();
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchArticles();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchArticles = async () => {
        const data = await articleService.getArticles();
        setArticles(data);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setAuthError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setAuthError(error.message);
        setFormLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setArticles([]);
    };

    const handleCreateNew = () => {
        setCurrentArticle({
            category: Category.Technology,
            date: new Date().toISOString().split('T')[0],
            tags: [],
        });
        setImageFile(null);
        setAuthorAvatarFile(null);
        setIsEditing(true);
    };

    const handleEdit = (article: Article) => {
        setCurrentArticle(article);
        setImageFile(null);
        setAuthorAvatarFile(null);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        await articleService.deleteArticle(id);
        fetchArticles();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            let imageUrl = currentArticle.featuredImage;
            let authorAvatarUrl = currentArticle.authorAvatar;

            if (imageFile) {
                const url = await articleService.uploadImage(imageFile);
                if (url) imageUrl = url;
            }

            if (authorAvatarFile) {
                const url = await articleService.uploadImage(authorAvatarFile);
                if (url) authorAvatarUrl = url;
            }

            const articleData = {
                ...currentArticle,
                featuredImage: imageUrl,
                authorAvatar: authorAvatarUrl,
            } as Article; // Type assertion for simplicity, validation recommended

            if (currentArticle.id) {
                await articleService.updateArticle(currentArticle.id, articleData);
            } else {
                await articleService.createArticle(articleData);
            }

            setIsEditing(false);
            fetchArticles();
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Failed to save article');
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
                <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                    {authError && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                            {authError}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={formLoading}
                            className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
                        >
                            {formLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-center text-slate-500">
                        Note: Ensure you have created a user in your Supabase Auth dashboard.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Content Manager</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleCreateNew}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            <Plus size={18} /> New Article
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-slate-800 z-40 py-2 border-b border-slate-100 dark:border-slate-700">
                            <h2 className="text-xl font-bold">{currentArticle.id ? 'Edit Article' : 'New Article'}</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={formLoading}
                                    className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
                                >
                                    {formLoading && <Loader2 className="animate-spin" size={14} />}
                                    Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={currentArticle.title || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <select
                                            value={currentArticle.category || Category.Technology}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value as Category })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                        >
                                            {Object.values(Category).map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Date</label>
                                        <input
                                            type="date"
                                            value={currentArticle.date || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, date: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Read Time</label>
                                        <input
                                            type="text"
                                            value={currentArticle.readTime || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, readTime: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                            placeholder="e.g. 5 min read"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Featured Image (Optional)</label>
                                        <p className="text-xs text-slate-500 mb-2">You can leave this empty to post without an image.</p>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center relative group/container">
                                            {currentArticle.featuredImage || imageFile ? (
                                                <div className="relative inline-block z-20">
                                                    <img
                                                        src={imageFile ? URL.createObjectURL(imageFile) : currentArticle.featuredImage || ''}
                                                        alt="Preview"
                                                        className="h-32 mx-auto mb-2 object-cover rounded shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent triggering file input if it overlaps
                                                            e.preventDefault();
                                                            setCurrentArticle({ ...currentArticle, featuredImage: null });
                                                            setImageFile(null);
                                                        }}
                                                        className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1.5 hover:bg-red-50 shadow-md transition-transform hover:scale-110 z-30"
                                                        title="Remove Image"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 mb-2 flex flex-col items-center">
                                                    <Upload className="mb-2" size={24} />
                                                    <span className="text-xs">Click to upload image</span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                key={imageFile ? 'has-file' : 'no-file'}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Excerpt</label>
                                        <textarea
                                            value={currentArticle.excerpt || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 h-32"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Author Information Section */}
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4">Author Information (Optional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Author Avatar</label>
                                        <p className="text-xs text-slate-500 mb-2">Upload author profile image</p>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center relative group/container">
                                            {currentArticle.authorAvatar || authorAvatarFile ? (
                                                <div className="relative inline-block z-20">
                                                    <img
                                                        src={authorAvatarFile ? URL.createObjectURL(authorAvatarFile) : currentArticle.authorAvatar || ''}
                                                        alt="Author Avatar Preview"
                                                        className="h-32 w-32 mx-auto mb-2 object-cover rounded-full shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setCurrentArticle({ ...currentArticle, authorAvatar: undefined });
                                                            setAuthorAvatarFile(null);
                                                        }}
                                                        className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-1.5 hover:bg-red-50 shadow-md transition-transform hover:scale-110 z-30"
                                                        title="Remove Avatar"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-slate-400 mb-2 flex flex-col items-center">
                                                    <Upload className="mb-2" size={24} />
                                                    <span className="text-xs">Click to upload avatar</span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setAuthorAvatarFile(e.target.files?.[0] || null)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                key={authorAvatarFile ? 'has-avatar' : 'no-avatar'}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Author Name</label>
                                            <input
                                                type="text"
                                                value={currentArticle.authorName || ''}
                                                onChange={(e) => setCurrentArticle({ ...currentArticle, authorName: e.target.value })}
                                                className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Author Role</label>
                                            <input
                                                type="text"
                                                value={currentArticle.authorRole || ''}
                                                onChange={(e) => setCurrentArticle({ ...currentArticle, authorRole: e.target.value })}
                                                className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                                placeholder="e.g. Writer, Researcher"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <RichTextEditor
                                    value={currentArticle.content || ''}
                                    onChange={(value) => setCurrentArticle({ ...currentArticle, content: value })}
                                    placeholder="Write your article content here..."
                                />
                            </div>

                            {/* Nepali Fields (Optional) */}
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-semibold mb-4">Nepali Translation (Optional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title (NE)</label>
                                        <input
                                            type="text"
                                            value={currentArticle.titleNe || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, titleNe: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Excerpt (NE)</label>
                                        <textarea
                                            value={currentArticle.excerptNe || ''}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, excerptNe: e.target.value })}
                                            className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 h-32"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium">Content (NE)</label>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const text = currentArticle.content || '';
                                                    if (!text) return;

                                                    // Open a new window for browser-native translation
                                                    const win = window.open('', '_blank');
                                                    if (!win) return;

                                                    win.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Translation Helper</title>
                                                                <style>
                                                                    body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
                                                                    .instruction { background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #bae6fd; color: #0c4a6e; }
                                                                    .instruction h3 { margin-top: 0; margin-bottom: 10px; }
                                                                    .content-preview { padding: 20px; border: 1px dashed #cbd5e1; border-radius: 8px; }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <div class="instruction">
                                                                    <h3>How to Translate and Keep Formatting:</h3>
                                                                    <ol>
                                                                        <li><strong>Right-click</strong> anywhere on this page and select <strong>"Translate to Nepali"</strong> (or use the Translate icon in your browser's address bar).</li>
                                                                        <li>Once the text changes to Nepali, <strong>Select the Article Text below</strong> (exclude these instructions).</li>
                                                                        <li><strong>Copy</strong> the translated text.</li>
                                                                        <li>Go back to the Admin Dashboard and <strong>Paste</strong> it into the Nepali content box.</li>
                                                                    </ol>
                                                                    <p style="font-size: 0.9em; margin-bottom: 0;"><em>Note: This method uses your browser's built-in translator, which understands formatting (Bold, Lists, etc.) much better than the standard copy-paste website.</em></p>
                                                                </div>
                                                                <div class="content-preview">
                                                                    ${text}
                                                                </div>
                                                            </body>
                                                        </html>
                                                    `);
                                                    win.document.close();
                                                }}
                                                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                                                title="Open Translation Helper Window"
                                            >
                                                <span className="underline">Translation Helper</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCurrentArticle({ ...currentArticle, contentNe: currentArticle.content })}
                                                className="text-xs text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300 flex items-center gap-1"
                                                title="Copy formatting and content from English editor"
                                            >
                                                <span className="underline">Copy from English</span>
                                            </button>
                                        </div>
                                    </div>
                                    <RichTextEditor
                                        value={currentArticle.contentNe || ''}
                                        onChange={(value) => setCurrentArticle({ ...currentArticle, contentNe: value })}
                                        placeholder="Write your Nepali article content here..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 rounded border hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {formLoading && <Loader2 className="animate-spin" size={16} />}
                                    Save Article
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex justify-between items-center group">
                                <div>
                                    <h3 className="font-bold text-lg">{article.title}</h3>
                                    <div className="text-sm text-slate-500 flex gap-4">
                                        <span>{article.date}</span>
                                        <span className="bg-slate-100 dark:bg-slate-700 px-2 rounded text-xs flex items-center">{article.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded"
                                        title="Edit"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {articles.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                No articles found. Create one to get started.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
