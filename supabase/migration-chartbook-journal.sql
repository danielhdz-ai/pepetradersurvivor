-- ================================================
-- MIGRACIÓN: CHARTBOOK Y DAILY JOURNAL
-- ================================================
-- Ejecutar en Supabase SQL Editor

-- ============================================
-- TABLA DE CHARTBOOK (IMÁGENES DE GRÁFICOS)
-- ============================================
CREATE TABLE IF NOT EXISTS chartbook_images (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id TEXT,
  date TEXT NOT NULL,
  image_data TEXT NOT NULL,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_chartbook_user ON chartbook_images(user_id);
CREATE INDEX IF NOT EXISTS idx_chartbook_account ON chartbook_images(user_id, account_id);
CREATE INDEX IF NOT EXISTS idx_chartbook_date ON chartbook_images(user_id, date);

-- RLS: Solo el usuario puede ver sus propias imágenes
ALTER TABLE chartbook_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own chartbook images" ON chartbook_images;
CREATE POLICY "Users can view own chartbook images"
  ON chartbook_images FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chartbook images" ON chartbook_images;
CREATE POLICY "Users can insert own chartbook images"
  ON chartbook_images FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own chartbook images" ON chartbook_images;
CREATE POLICY "Users can update own chartbook images"
  ON chartbook_images FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own chartbook images" ON chartbook_images;
CREATE POLICY "Users can delete own chartbook images"
  ON chartbook_images FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TABLA DE DAILY JOURNAL (ENTRADAS DIARIAS)
-- ============================================
CREATE TABLE IF NOT EXISTS daily_journal_entries (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id TEXT,
  date TEXT NOT NULL,
  mood TEXT,
  emotions TEXT[],
  pre_trading_note TEXT,
  post_trading_note TEXT,
  lessons_learned TEXT,
  image_data TEXT,
  daily_pnl NUMERIC(20, 2) DEFAULT 0,
  trades_count INTEGER DEFAULT 0,
  win_rate NUMERIC(5, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_journal_user ON daily_journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_account ON daily_journal_entries(user_id, account_id);
CREATE INDEX IF NOT EXISTS idx_journal_date ON daily_journal_entries(user_id, date);

-- RLS: Solo el usuario puede ver sus propias entradas
ALTER TABLE daily_journal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own journal entries" ON daily_journal_entries;
CREATE POLICY "Users can view own journal entries"
  ON daily_journal_entries FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own journal entries" ON daily_journal_entries;
CREATE POLICY "Users can insert own journal entries"
  ON daily_journal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own journal entries" ON daily_journal_entries;
CREATE POLICY "Users can update own journal entries"
  ON daily_journal_entries FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own journal entries" ON daily_journal_entries;
CREATE POLICY "Users can delete own journal entries"
  ON daily_journal_entries FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================
CREATE TRIGGER update_chartbook_images_updated_at 
  BEFORE UPDATE ON chartbook_images
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_journal_entries_updated_at 
  BEFORE UPDATE ON daily_journal_entries
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICACIÓN
-- ============================================
SELECT 'Migración completada exitosamente' as status;
