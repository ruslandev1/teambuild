-- TeamBuild site content (singleton row)
CREATE TABLE IF NOT EXISTS site_content (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS site_content_data_gin ON site_content USING GIN (data);
