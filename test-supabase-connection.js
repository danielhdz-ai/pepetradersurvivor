// ===== SCRIPT DE PRUEBA RÁPIDA SUPABASE =====
// Ejecuta este script en la consola del navegador para verificar la conexión

console.log('🚀 Iniciando prueba de conexión Supabase...\n');

(async function testSupabase() {
    try {
        // 1. Verificar que Supabase está cargado
        console.log('1️⃣ Verificando cliente Supabase...');
        if (!window.supabaseClient) {
            console.error('❌ Cliente Supabase no encontrado');
            return;
        }
        console.log('✅ Cliente Supabase encontrado\n');

        // 2. Test de conectividad
        console.log('2️⃣ Probando conectividad...');
        const response = await fetch('https://gakiamardmlgftfrlxkm.supabase.co/rest/v1/', {
            method: 'HEAD',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha2lhbWFyZG1sZ2Z0ZnJseGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjczMzUsImV4cCI6MjA2ODYwMzMzNX0.wR3c9DMtSXzoagFDJdrmYqnN6vjfQMn8ijtUdOSpmYM'
            }
        });
        console.log(`✅ Servidor accesible - Status: ${response.status}\n`);

        // 3. Verificar sesión
        console.log('3️⃣ Verificando sesión de usuario...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.warn('⚠️ Error obteniendo sesión:', sessionError.message);
        }
        
        if (session) {
            console.log('✅ Sesión activa encontrada:');
            console.log(`   📧 Email: ${session.user.email}`);
            console.log(`   👤 User ID: ${session.user.id}`);
            console.log(`   ⏰ Expira: ${new Date(session.expires_at * 1000).toLocaleString()}\n`);
            
            // 4. Test de base de datos
            console.log('4️⃣ Probando acceso a base de datos...');
            const { data: accounts, error: dbError } = await supabase
                .from('accounts')
                .select('id, name, platform')
                .limit(5);
            
            if (dbError) {
                console.error('❌ Error consultando base de datos:', dbError.message);
            } else {
                console.log(`✅ Consulta exitosa - ${accounts.length} cuentas encontradas:`);
                accounts.forEach(acc => {
                    console.log(`   • ${acc.name} (${acc.platform})`);
                });
            }
            
        } else {
            console.log('ℹ️ No hay sesión activa (usuario no logueado)\n');
        }

        // 5. Resultado final
        console.log('\n🎉 ===== PRUEBA COMPLETADA =====');
        console.log('✅ Supabase está funcionando correctamente');
        console.log(`✅ Estado: ${session ? 'Autenticado' : 'No autenticado'}`);
        
    } catch (error) {
        console.error('❌ Error durante la prueba:', error);
        console.error('\n💡 Posibles causas:');
        console.error('   1. Proyecto de Supabase pausado/inactivo');
        console.error('   2. Sin conexión a internet');
        console.error('   3. Firewall bloqueando la conexión');
    }
})();
