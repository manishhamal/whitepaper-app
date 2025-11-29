/**
 * Translation service using MyMemory Translation API
 * Free tier - no API key required
 */

interface TranslationResponse {
    responseData: {
        translatedText: string;
    };
    responseStatus: number;
    responseDetails?: string;
}

export const translationService = {
    /**
     * Translate text from source language to target language with retry logic
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

        // Limit text length to avoid API issues
        const maxLength = 500;
        if (text.length > maxLength) {
            // Split into chunks and translate separately
            const chunks = text.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [];
            const translatedChunks: string[] = [];

            for (const chunk of chunks) {
                const translated = await this.translateTextChunk(chunk, sourceLang, targetLang);
                translatedChunks.push(translated);
                // Small delay between chunks
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            return translatedChunks.join('');
        }

        return await this.translateTextChunk(text, sourceLang, targetLang);
    },

    async translateTextChunk(
        text: string,
        sourceLang: string,
        targetLang: string,
        retries: number = 2
    ): Promise<string> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                // MyMemory API endpoint
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    text
                )}&langpair=${sourceLang}|${targetLang}`;

                console.log(`Translation attempt ${attempt + 1} for text:`, text.substring(0, 50));

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`API returned status ${response.status}`);
                }

                const data: TranslationResponse = await response.json();

                console.log('Translation response:', data);

                if (data.responseStatus !== 200) {
                    throw new Error(data.responseDetails || 'Translation API error');
                }

                if (!data.responseData?.translatedText) {
                    throw new Error('No translation returned');
                }

                return data.responseData.translatedText;
            } catch (error) {
                console.error(`Translation attempt ${attempt + 1} failed:`, error);

                if (attempt < retries) {
                    // Wait before retry
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                } else {
                    throw error;
                }
            }
        }

        return text; // Fallback to original text
    },

    /**
     * Translate HTML content while preserving tags
     * Extracts text from HTML and translates it
     */
    async translateHTML(html: string): Promise<string> {
        if (!html || html.trim() === '') {
            return '';
        }

        try {
            // Simple approach: translate the whole HTML as text
            // The API should preserve most HTML tags
            return await this.translateText(html);
        } catch (error) {
            console.error('HTML translation error:', error);
            throw error;
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
            console.log('Starting article translation...');

            // Translate one at a time to avoid rate limiting
            const titleNe = await this.translateText(article.title);
            console.log('Title translated');

            await new Promise(resolve => setTimeout(resolve, 500));

            const excerptNe = await this.translateText(article.excerpt);
            console.log('Excerpt translated');

            await new Promise(resolve => setTimeout(resolve, 500));

            const contentNe = await this.translateHTML(article.content);
            console.log('Content translated');

            return {
                titleNe,
                excerptNe,
                contentNe,
            };
        } catch (error: any) {
            console.error('Article translation error:', error);
            throw new Error(`Translation failed: ${error.message}. Please check your internet connection and try again.`);
        }
    },
};
