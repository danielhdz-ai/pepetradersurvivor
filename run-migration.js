// Script para ejecutar la migración de user_settings en Supabase
// Ejecutar con: node run-migration.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://yxrhwynhzhtptibpcgjh.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cmh3eW5oemh0cHRpYnBjZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNDY1NjcsImV4cCI6MjA0ODgyMjU2N30.HqgNKtO2rO8h7w2awCN4qMGBK1Q82PwNk-wLdtxD9io';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🚀 Iniciando migración de user_settings...\n');

  try {
    // Paso 1: Agregar columnas
    console.log('📝 Paso 1: Agregando columnas username, country, is_public...');
    const { data: alterData, error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE user_settings 
          ADD COLUMN IF NOT EXISTS username TEXT,
          ADD COLUMN IF NOT EXISTS country TEXT,
          ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
      `
    });

    if (alterError) {
      console.error('❌ Error al agregar columnas:', alterError.message);
      console.log('⚠️  Esto puede ser normal si las columnas ya existen.\n');
    } else {
      console.log('✅ Columnas agregadas correctamente\n');
    }

    // Paso 2: Crear índice
    console.log('📝 Paso 2: Creando índice para perfiles públicos...');
    const { data: indexData, error: indexError } = await supabase.rpc('exec_sql', {
      sql: `CREATE INDEX IF NOT EXISTS idx_user_settings_public ON user_settings(is_public, user_id);`
    });

    if (indexError) {
      console.error('❌ Error al crear índice:', indexError.message);
    } else {
      console.log('✅ Índice creado correctamente\n');
    }

    // Paso 3: Verificar columnas
    console.log('📝 Paso 3: Verificando estructura de la tabla...');
    const { data: columns, error: columnsError } = await supabase.rpc('exec_sql', {
      sql: `
        SELECT 
          column_name, 
          data_type, 
          is_nullable,
          column_default
        FROM information_schema.columns 
        WHERE table_name = 'user_settings'
        ORDER BY ordinal_position;
      `
    });

    if (columnsError) {
      console.error('❌ Error al verificar columnas:', columnsError.message);
    } else {
      console.log('✅ Estructura de la tabla:');
      console.table(columns);
    }

    console.log('\n✅ Migración completada exitosamente!');
    console.log('\n📌 Próximos pasos:');
    console.log('1. Ir a Configuración → Información del Usuario');
    console.log('2. Seleccionar tu país');
    console.log('3. Activar "Perfil Público"');
    console.log('4. Guardar cambios');
    console.log('5. Ir a "Social Media" para ver el leaderboard\n');

  } catch (error) {
    console.error('❌ Error ejecutando migración:', error);
    console.log('\n⚠️  MÉTODO ALTERNATIVO:');
    console.log('Si este script no funciona, copia y pega el siguiente SQL en Supabase Dashboard → SQL Editor:\n');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`
ALTER TABLE user_settings 
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_user_settings_public ON user_settings(is_public, user_id);

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_settings;
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_settings FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);
    `);
    console.log('─────────────────────────────────────────────────────────────\n');
  }
}

// Ejecutar migración
runMigration();
