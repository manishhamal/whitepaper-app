import { supabase } from '../lib/supabase';
import { ArticleAnalytics } from '../../types';

/**
 * Analytics Service
 * Handles article view and read tracking using Supabase
 */

/**
 * Get analytics for a specific article
 * Creates a new record if it doesn't exist
 */
export const getArticleAnalytics = async (articleId: string): Promise<ArticleAnalytics> => {
    try {
        // Try to fetch existing analytics
        const { data, error } = await supabase
            .from('article_analytics')
            .select('*')
            .eq('article_id', articleId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error fetching analytics:', error);
            throw error;
        }

        // If no record exists, create one
        if (!data) {
            const { data: newData, error: insertError } = await supabase
                .from('article_analytics')
                .insert({ article_id: articleId, views: 0, reads: 0 })
                .select()
                .single();

            if (insertError) {
                console.error('Error creating analytics record:', insertError);
                throw insertError;
            }

            return newData;
        }

        return data;
    } catch (error) {
        console.error('Failed to get article analytics:', error);
        // Return default values on error
        return {
            id: '',
            article_id: articleId,
            views: 0,
            reads: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
    }
};

/**
 * Track a view for an article
 * Uses atomic increment function to prevent race conditions
 */
export const trackView = async (articleId: string): Promise<void> => {
    try {
        const { error } = await supabase.rpc('increment_view_count', {
            p_article_id: articleId,
        });

        if (error) {
            console.error('Error tracking view:', error);
        }
    } catch (error) {
        console.error('Failed to track view:', error);
    }
};

/**
 * Track a read for an article
 * Uses atomic increment function to prevent race conditions
 */
export const trackRead = async (articleId: string): Promise<void> => {
    try {
        const { error } = await supabase.rpc('increment_read_count', {
            p_article_id: articleId,
        });

        if (error) {
            console.error('Error tracking read:', error);
        }
    } catch (error) {
        console.error('Failed to track read:', error);
    }
};

/**
 * Subscribe to real-time analytics updates for an article
 * Returns an unsubscribe function
 */
export const subscribeToAnalytics = (
    articleId: string,
    callback: (analytics: ArticleAnalytics) => void
): (() => void) => {
    const channel = supabase
        .channel(`analytics:${articleId}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'article_analytics',
                filter: `article_id=eq.${articleId}`,
            },
            (payload) => {
                if (payload.new) {
                    callback(payload.new as ArticleAnalytics);
                }
            }
        )
        .subscribe();

    // Return unsubscribe function
    return () => {
        supabase.removeChannel(channel);
    };
};
