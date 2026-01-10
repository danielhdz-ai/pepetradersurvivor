# 🚀 Instrucciones de Deployment - NinjaTrader Integration

## Pre-requisitos

✅ Cuenta en Vercel  
✅ Proyecto conectado a Git  
✅ Supabase configurado  
✅ Variables de entorno configuradas  

## 📝 Checklist antes del Deploy

- [ ] Todos los archivos creados están en el repositorio
- [ ] Variables de entorno verificadas en Vercel
- [ ] Endpoint `/api/proxy-ninjatrader.js` compilará correctamente
- [ ] Frontend scripts incluidos en `index.html`
- [ ] Logo `ninja-logo.png` disponible en `/logos`

## 🔧 Pasos para Deploy

### 1. Verificar Archivos Locales

```bash
# Verificar que todos los archivos están presentes
ls api/proxy-ninjatrader.js
ls ninjatrader-integration/
ls frontend/ninjatrader-integration.js
```

### 2. Commit y Push a Git

```bash
cd "c:\Users\Daniel HDZ\Desktop\tradersurvivir su"

# Ver archivos modificados/nuevos
git status

# Agregar todos los archivos nuevos
git add api/proxy-ninjatrader.js
git add ninjatrader-integration/
git add frontend/ninjatrader-integration.js
git add index.html
git add NINJATRADER-README.md

# Commit
git commit -m "feat: Add NinjaTrader API integration
- API endpoint for receiving trades from NinjaTrader
- C# Strategy for NinjaTrader 8
- Frontend UI for configuration
- Complete documentation and examples"

# Push
git push origin main
```

### 3. Deploy Automático en Vercel

Vercel detectará los cambios automáticamente y hará deploy.

Espera a que termine (normalmente 1-2 minutos).

### 4. Verificar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables

**Verifica que existen:**

```
NEXT_PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
SUPABASE_SERVICE_KEY = eyJ... (tu service key)
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ... (tu anon key)
```

Si no existen, agrégalas y redeploy.

### 5. Verificar Schema de Supabase

Asegúrate de que la tabla `api_credentials` existe:

```sql
-- En Supabase SQL Editor
SELECT * FROM api_credentials LIMIT 1;
```

Si no existe, ejecuta el schema en `supabase/schema.sql`

### 6. Test del Endpoint en Producción

Una vez deployado, prueba el endpoint:

```bash
# Test básico (debería fallar con "API Key requerida")
curl -X POST https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader \
  -H "Content-Type: application/json" \
  -d '{"instrument":"ES","action":"Buy"}'

# Deberías recibir:
# {"success":false,"error":"API Key requerida..."}
```

✅ Si recibes ese error, el endpoint funciona.

### 7. Generar Primera API Key

1. Ve a https://pepetradersurvivor.vercel.app
2. Inicia sesión
3. Ve a Configuración → Plataformas
4. Click en NinjaTrader → Botón "Sincronizar"
5. Click "Generar API Key"
6. Copia la API Key

### 8. Test Completo con API Key

```bash
# Reemplaza TU_API_KEY con la key que generaste
curl -X POST https://pepetradersurvivor.vercel.app/api/proxy-ninjatrader \
  -H "Content-Type: application/json" \
  -H "X-API-Key: TU_API_KEY" \
  -d '{
    "orderId": "test123",
    "instrument": "ES 03-25",
    "symbol": "ES",
    "action": "BuyToCover",
    "entryPrice": 5875.50,
    "exitPrice": 5880.25,
    "quantity": 1,
    "realizedPnL": 237.50,
    "commission": 4.80,
    "entryTime": "2025-12-31T09:30:00",
    "exitTime": "2025-12-31T10:15:00"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Trade guardado exitosamente",
  "data": {
    "id": "ninja_...",
    "instrument": "ES 03-25",
    "type": "buy",
    "pnl": 237.50,
    "status": "closed"
  }
}
```

### 9. Verificar en Trader Survivor

1. Ve a Operaciones en Trader Survivor
2. Deberías ver el trade de prueba
3. Verifica que todos los campos se guardaron correctamente

### 10. Test con NinjaTrader Real

1. Descarga `TraderSurvivorExporter.cs` desde el modal
2. Instala en NinjaTrader 8
3. Configura con tu API Key
4. Ejecuta un trade de prueba en cuenta demo
5. Verifica que aparece en Trader Survivor

## 🐛 Troubleshooting

### Error: "Module not found @supabase/supabase-js"

**Solución:** Vercel debería instalar automáticamente. Si no:

1. Ve a Vercel → Project Settings → General
2. En "Build & Development Settings"
3. Verifica que Build Command está configurado

### Error: "CORS" en el navegador

**Solución:** Ya está configurado en el endpoint. Si persiste:

1. Verifica que el endpoint tiene los headers CORS
2. Reinicia el deployment en Vercel

### Error: "API Key inválida" con key correcta

**Solución:**

1. Verifica que la API Key se guardó en Supabase:
   ```sql
   SELECT * FROM api_credentials WHERE platform = 'ninjatrader';
   ```

2. Verifica que `is_active = true`

3. Regenera la API Key si es necesario

### Trades no aparecen en Trader Survivor

**Verificar:**

1. El endpoint devolvió `success: true`
2. La sesión del usuario está activa
3. Row Level Security permite ver las operaciones
4. El `user_id` coincide

## 📊 Logs y Debugging

### Ver logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en el deployment más reciente
3. Tab "Functions"
4. Click en `/api/proxy-ninjatrader`
5. Verás los logs en tiempo real

### Ver logs en NinjaTrader

1. Abre la ventana Output (Ctrl+O)
2. Deberías ver mensajes como:
   ```
   ✅ Trade exportado a Trader Survivor: ES 03-25 | P&L: $237.50
   ```

## ✅ Checklist Post-Deploy

- [ ] Endpoint responde correctamente
- [ ] API Keys se generan desde la UI
- [ ] Trades de prueba se guardan
- [ ] Estrategia NinjaTrader compila
- [ ] Modal de configuración funciona
- [ ] Documentación accesible
- [ ] Tests pasan correctamente

## 🎉 ¡Deploy Completado!

Si todos los checks pasan, la integración está funcionando correctamente.

## 📞 Soporte

Si encuentras algún problema:

1. Revisa los logs en Vercel
2. Consulta la documentación en `ninjatrader-integration/`
3. Ejecuta los tests en `test-endpoint.js`

---

**Última actualización:** 31 de Diciembre, 2025
