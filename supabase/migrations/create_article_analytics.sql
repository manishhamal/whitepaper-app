-- Create article_analytics table
CREATE TABLE IF NOT EXISTS article_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id TEXT NOT NULL UNIQUE,
    views INTEGER DEFAULT 0 NOT NULL,
    reads INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on article_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_article_analytics_article_id ON article_analytics(article_id);

-- Enable Row Level Security
ALTER TABLE article_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read analytics (public read access)
CREATE POLICY "Allow public read access" ON article_analytics
    FOR SELECT
    USING (true);

-- Policy: Allow anyone to insert new analytics records
CREATE POLICY "Allow public insert access" ON article_analytics
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow anyone to update analytics records
CREATE POLICY "Allow public update access" ON article_analytics
    FOR UPDATE
    USING (true);

-- Function to increment view count atomically
CREATE OR REPLACE FUNCTION increment_view_count(p_article_id TEXT)
RETURNS article_analytics AS $$
DECLARE
    result article_analytics;
BEGIN
    -- Insert or update the record
    INSERT INTO article_analytics (article_id, views, reads)
    VALUES (p_article_id, 1, 0)
    ON CONFLICT (article_id)
    DO UPDATE SET
        views = article_analytics.views + 1,
        updated_at = NOW()
    RETURNING * INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment read count atomically
CREATE OR REPLACE FUNCTION increment_read_count(p_article_id TEXT)
RETURNS article_analytics AS $$
DECLARE
    result article_analytics;
BEGIN
    -- Insert or update the record
    INSERT INTO article_analytics (article_id, views, reads)
    VALUES (p_article_id, 0, 1)
    ON CONFLICT (article_id)
    DO UPDATE SET
        reads = article_analytics.reads + 1,
        updated_at = NOW()
    RETURNING * INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE article_analytics;
