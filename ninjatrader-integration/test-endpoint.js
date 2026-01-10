// =====================================================
// TEST SCRIPT - NinjaTrader API Endpoint
// Ejecutar en consola del navegador o Node.js
// =====================================================

async function testNinjaTraderEndpoint() {
    console.log('🧪 Iniciando tests del endpoint NinjaTrader...\n');
    
    const API_URL = 'https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader';
    const TEST_API_KEY = 'TU_API_KEY_AQUI'; // Reemplazar con API Key real
    
    // Test 1: Trade Ganador (Long)
    console.log('📊 Test 1: Trade Ganador (Long)');
    try {
        const response1 = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': TEST_API_KEY
            },
            body: JSON.stringify({
                orderId: `test_${Date.now()}_1`,
                instrument: 'ES 03-25',
                symbol: 'ES',
                action: 'BuyToCover',
                orderType: 'Market',
                entryPrice: 5875.50,
                exitPrice: 5880.25,
                quantity: 1,
                realizedPnL: 237.50,
                commission: 4.80,
                entryTime: '2025-12-31T09:30:00',
                exitTime: '2025-12-31T10:15:00'
            })
        });
        
        const data1 = await response1.json();
        console.log('✅ Respuesta:', data1);
        
        if (data1.success) {
            console.log('✅ Test 1 PASSED\n');
        } else {
            console.error('❌ Test 1 FAILED:', data1.error, '\n');
        }
    } catch (error) {
        console.error('❌ Test 1 ERROR:', error.message, '\n');
    }
    
    // Test 2: Trade Perdedor (Short)
    console.log('📊 Test 2: Trade Perdedor (Short)');
    try {
        const response2 = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': TEST_API_KEY
            },
            body: JSON.stringify({
                orderId: `test_${Date.now()}_2`,
                instrument: 'NQ 03-25',
                symbol: 'NQ',
                action: 'Sell',
                orderType: 'Limit',
                entryPrice: 17250.00,
                exitPrice: 17285.50,
                quantity: 1,
                realizedPnL: -710.00,
                commission: 4.80,
                entryTime: '2025-12-31T11:00:00',
                exitTime: '2025-12-31T11:30:00'
            })
        });
        
        const data2 = await response2.json();
        console.log('✅ Respuesta:', data2);
        
        if (data2.success && data2.data.result === 'loss') {
            console.log('✅ Test 2 PASSED\n');
        } else {
            console.error('❌ Test 2 FAILED:', data2, '\n');
        }
    } catch (error) {
        console.error('❌ Test 2 ERROR:', error.message, '\n');
    }
    
    // Test 3: Trade Breakeven
    console.log('📊 Test 3: Trade Breakeven');
    try {
        const response3 = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': TEST_API_KEY
            },
            body: JSON.stringify({
                orderId: `test_${Date.now()}_3`,
                instrument: 'CL 02-25',
                symbol: 'CL',
                action: 'BuyToCover',
                orderType: 'Market',
                entryPrice: 75.50,
                exitPrice: 75.50,
                quantity: 1,
                realizedPnL: 0,
                commission: 4.80,
                entryTime: '2025-12-31T13:00:00',
                exitTime: '2025-12-31T13:15:00'
            })
        });
        
        const data3 = await response3.json();
        console.log('✅ Respuesta:', data3);
        
        if (data3.success && data3.data.result === 'breakeven') {
            console.log('✅ Test 3 PASSED\n');
        } else {
            console.error('❌ Test 3 FAILED:', data3, '\n');
        }
    } catch (error) {
        console.error('❌ Test 3 ERROR:', error.message, '\n');
    }
    
    // Test 4: Sin API Key (debe fallar)
    console.log('📊 Test 4: Sin API Key (debe fallar)');
    try {
        const response4 = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: `test_${Date.now()}_4`,
                instrument: 'ES 03-25',
                action: 'BuyToCover',
                entryPrice: 5875.50,
                exitPrice: 5880.25
            })
        });
        
        const data4 = await response4.json();
        
        if (!data4.success && response4.status === 401) {
            console.log('✅ Test 4 PASSED (error esperado)\n');
        } else {
            console.error('❌ Test 4 FAILED: Debería haber fallado sin API Key\n');
        }
    } catch (error) {
        console.error('❌ Test 4 ERROR:', error.message, '\n');
    }
    
    // Test 5: Datos incompletos (debe fallar)
    console.log('📊 Test 5: Datos incompletos (debe fallar)');
    try {
        const response5 = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': TEST_API_KEY
            },
            body: JSON.stringify({
                // Falta instrument y action
                orderId: `test_${Date.now()}_5`,
                entryPrice: 5875.50
            })
        });
        
        const data5 = await response5.json();
        
        if (!data5.success && response5.status === 400) {
            console.log('✅ Test 5 PASSED (error esperado)\n');
        } else {
            console.error('❌ Test 5 FAILED: Debería haber fallado con datos incompletos\n');
        }
    } catch (error) {
        console.error('❌ Test 5 ERROR:', error.message, '\n');
    }
    
    console.log('🏁 Tests completados!');
}

// Ejecutar tests
// testNinjaTraderEndpoint();

console.log('Para ejecutar los tests:');
console.log('1. Reemplaza TEST_API_KEY con tu API Key real');
console.log('2. Ejecuta: testNinjaTraderEndpoint()');
