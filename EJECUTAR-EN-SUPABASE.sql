-- ================================================
-- MIGRACIÓN SIMPLIFICADA: PERFIL PÚBLICO
-- ================================================
-- INSTRUCCIONES:
-- 1. Ir a: https://supabase.com/dashboard/project/yxrhwynhzhtptibpcgjh/sql
-- 2. Copiar TODO este código
-- 3. Pegar en el SQL Editor
-- 4. Click en "RUN" o presionar Ctrl+Enter
-- ================================================

-- Paso 1: Agregar columnas a user_settings
ALTER TABLE user_settings 
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Paso 2: Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_user_settings_public ON user_settings(is_public, user_id);

-- Paso 3: Actualizar política RLS para perfiles públicos
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

-- Paso 4: Verificar que todo se creó correctamente
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_settings'
ORDER BY ordinal_position;

-- ================================================
-- ✅ Si ves los resultados con las columnas:
--    - user_id
--    - settings
--    - created_at
--    - updated_at
--    - username (NUEVO)
--    - country (NUEVO)
--    - is_public (NUEVO)
-- 
-- ¡La migración fue exitosa! 🎉
-- ================================================
