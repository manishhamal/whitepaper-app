// Simple localStorage-based analytics
const STORAGE_KEY = 'whitepaper_analytics';

interface ArticleStats {
    views: number;
    reads: number;
    lastViewed?: string;
}

interface AnalyticsData {
    [articleId: string]: ArticleStats;
}

// Get all analytics data
export const getAnalytics = (): AnalyticsData => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error reading analytics:', error);
        return {};
    }
};

// Save analytics data
const saveAnalytics = (data: AnalyticsData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving analytics:', error);
    }
};

// Track article view
export const trackView = (articleId: string): void => {
    const analytics = getAnalytics();

    if (!analytics[articleId]) {
        analytics[articleId] = { views: 0, reads: 0 };
    }

    analytics[articleId].views += 1;
    analytics[articleId].lastViewed = new Date().toISOString();

    saveAnalytics(analytics);
};

// Track article read (when user scrolls to end)
export const trackRead = (articleId: string): void => {
    const analytics = getAnalytics();

    if (!analytics[articleId]) {
        analytics[articleId] = { views: 0, reads: 0 };
    }

    analytics[articleId].reads += 1;

    saveAnalytics(analytics);
};

// Get stats for a specific article
export const getArticleStats = (articleId: string): ArticleStats => {
    const analytics = getAnalytics();
    return analytics[articleId] || { views: 0, reads: 0 };
};

// Get total stats across all articles
export const getTotalStats = (): { totalViews: number; totalReads: number } => {
    const analytics = getAnalytics();
    let totalViews = 0;
    let totalReads = 0;

    Object.values(analytics).forEach(stats => {
        totalViews += stats.views;
        totalReads += stats.reads;
    });

    return { totalViews, totalReads };
};
