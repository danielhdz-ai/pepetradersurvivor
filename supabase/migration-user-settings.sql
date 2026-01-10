-- ================================================
-- MIGRACIÓN: AGREGAR CAMPOS DE PERFIL PÚBLICO
-- ================================================
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columnas a user_settings
ALTER TABLE user_settings 
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS profile_image TEXT,
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- 2. Crear índice para búsquedas de perfiles públicos
CREATE INDEX IF NOT EXISTS idx_user_settings_public ON user_settings(is_public, user_id);

-- 3. Política RLS para perfiles públicos
-- Permitir que todos vean los perfiles públicos
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_settings;
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_settings FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

-- Verificar que las columnas se agregaron correctamente
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_settings'
ORDER BY ordinal_position;
