import { supabase } from '../lib/supabase';
import { Article, Category } from '../../types';

export const articleService = {
    async getArticles(): Promise<Article[]> {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching articles:', error);
            return [];
        }

        return data.map(mapToArticle);
    },

    async getArticleById(id: string): Promise<Article | undefined> {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching article:', error);
            return undefined;
        }

        return mapToArticle(data);
    },

    async createArticle(article: Omit<Article, 'id' | 'views'>): Promise<Article | null> {
        const dbArticle = mapToDb(article);
        const { data, error } = await supabase
            .from('articles')
            .insert(dbArticle)
            .select()
            .single();

        if (error) {
            console.error('Error creating article:', error);
            return null;
        }

        return mapToArticle(data);
    },

    async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
        const dbUpdates = mapToDbPartial(updates);
        const { data, error } = await supabase
            .from('articles')
            .update(dbUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating article:', error);
            return null;
        }

        return mapToArticle(data);
    },

    async deleteArticle(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting article:', error);
            return false;
        }

        return true;
    },

    async uploadImage(file: File): Promise<string | null> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from('article-images')
            .upload(fileName, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('article-images')
            .getPublicUrl(fileName);

        return publicUrl;
    }
};

// Helpers to map between CamelCase (App) and Snake_Case (DB)

function mapToArticle(data: any): Article {
    return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: data.date,
        category: data.category as Category,
        readTime: data.read_time,
        tags: data.tags || [],
        featuredImage: data.featured_image,
        views: data.views,
        titleNe: data.title_ne,
        excerptNe: data.excerpt_ne,
        contentNe: data.content_ne,
        tagsNe: data.tags_ne || [],
    };
}

function mapToDb(article: Omit<Article, 'id' | 'views'>): any {
    return {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        date: article.date,
        category: article.category,
        read_time: article.readTime,
        tags: article.tags,
        featured_image: article.featuredImage,
        title_ne: article.titleNe,
        excerpt_ne: article.excerptNe,
        content_ne: article.contentNe,
        tags_ne: article.tagsNe,
    };
}

function mapToDbPartial(updates: Partial<Article>): any {
    const mapped: any = {};
    if (updates.title !== undefined) mapped.title = updates.title;
    if (updates.excerpt !== undefined) mapped.excerpt = updates.excerpt;
    if (updates.content !== undefined) mapped.content = updates.content;
    if (updates.date !== undefined) mapped.date = updates.date;
    if (updates.category !== undefined) mapped.category = updates.category;
    if (updates.readTime !== undefined) mapped.read_time = updates.readTime;
    if (updates.tags !== undefined) mapped.tags = updates.tags;
    if (updates.featuredImage !== undefined) mapped.featured_image = updates.featuredImage;
    if (updates.titleNe !== undefined) mapped.title_ne = updates.titleNe;
    if (updates.excerptNe !== undefined) mapped.excerpt_ne = updates.excerptNe;
    if (updates.contentNe !== undefined) mapped.content_ne = updates.contentNe;
    if (updates.tagsNe !== undefined) mapped.tags_ne = updates.tagsNe;
    return mapped;
}
