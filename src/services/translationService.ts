/**
 * Translation service using MyMemory Translation API
 * Free tier - no API key required
 */

interface TranslationResponse {
    responseData: {
        translatedText: string;
    };
    responseStatus: number;
}

export const translationService = {
    /**
     * Translate text from source language to target language
     * @param text - Text to translate
     * @param sourceLang - Source language code (e.g., 'en')
     * @param targetLang - Target language code (e.g., 'ne')
     * @returns Translated text
     */
    async translateText(
        text: string,
        sourceLang: string = 'en',
        targetLang: string = 'ne'
    ): Promise<string> {
        if (!text || text.trim() === '') {
            return '';
        }

        try {
            // MyMemory API endpoint
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                text
            )}&langpair=${sourceLang}|${targetLang}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Translation API error: ${response.status}`);
            }

            const data: TranslationResponse = await response.json();

            if (data.responseStatus !== 200) {
                throw new Error('Translation failed');
            }

            return data.responseData.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error('Failed to translate text. Please try again.');
        }
    },

    /**
     * Translate HTML content while preserving tags
     * Splits HTML into chunks and translates text content only
     */
    async translateHTML(html: string): Promise<string> {
        if (!html || html.trim() === '') {
            return '';
        }

        try {
            // For HTML content, we'll translate in chunks to avoid issues with long text
            // Split by paragraphs and translate each separately
            const paragraphs = html.split(/(<p>|<\/p>|<h[1-6]>|<\/h[1-6]>|<li>|<\/li>)/);
            const translatedParagraphs: string[] = [];

            for (const paragraph of paragraphs) {
                // If it's a tag or empty, keep as is
                if (paragraph.match(/^<\/?[a-z0-9]+>$/i) || paragraph.trim() === '') {
                    translatedParagraphs.push(paragraph);
                } else {
                    // Translate the text content
                    const translated = await this.translateText(paragraph);
                    translatedParagraphs.push(translated);
                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            return translatedParagraphs.join('');
        } catch (error) {
            console.error('HTML translation error:', error);
            // Fallback to simple translation
            return await this.translateText(html);
        }
    },

    /**
     * Translate an entire article object
     */
    async translateArticle(article: {
        title: string;
        excerpt: string;
        content: string;
    }): Promise<{
        titleNe: string;
        excerptNe: string;
        contentNe: string;
    }> {
        try {
            const [titleNe, excerptNe, contentNe] = await Promise.all([
                this.translateText(article.title),
                this.translateText(article.excerpt),
                this.translateHTML(article.content),
            ]);

            return {
                titleNe,
                excerptNe,
                contentNe,
            };
        } catch (error) {
            console.error('Article translation error:', error);
            throw error;
        }
    },
};
