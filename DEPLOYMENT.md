# Trader Survivor - Deployment Guide

## 🚀 Despliegue en Vercel (Automático)

Esta aplicación está completamente configurada para desplegarse en Vercel con todas las APIs funcionando automáticamente.

### Pasos para Desplegar:

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

2. **Configura las variables de entorno en Vercel:**
   - `SUPABASE_URL`: Tu URL de Supabase
   - `SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

3. **Despliega:**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará automáticamente

### 🔌 APIs Serverless

Las siguientes APIs están configuradas como funciones serverless:

#### BingX API
- **Endpoint**: `/api/bingx/*`
- **Uso**: Proxy para BingX Futures/Spot API
- **Ejemplo**: `POST /api/bingx/openApi/swap/v2/user/balance`

#### MEXC API
- **Endpoint**: `/api/mexc`
- **Método**: POST
- **Body**:
  ```json
  {
    "apiKey": "YOUR_API_KEY",
    "secretKey": "YOUR_SECRET_KEY",
    "endpoint": "/api/v1/private/account/assets",
    "params": {}
  }
  ```

#### Bitget API
- **Endpoint**: `/api/bitget/*`
- **Uso**: Proxy para Bitget Futures/Spot API
- **Ejemplo**: `GET /api/bitget/api/v2/mix/order/fills?productType=USDT-FUTURES`

### 🏠 Desarrollo Local

Para desarrollo local:

```bash
# Instalar dependencias
npm install

# Iniciar servidor proxy local
npm start
```

El servidor local correrá en `http://127.0.0.1:8003`

### ✨ Características

- ✅ **Detección automática de entorno**: La app detecta si está en Vercel o local
- ✅ **CORS configurado**: Todas las APIs tienen CORS habilitado
- ✅ **Seguridad**: Las credenciales se envían mediante headers HTTP
- ✅ **Multi-usuario**: Cada usuario tiene sus propias credenciales en Supabase
- ✅ **Serverless**: Sin servidores que mantener

### 📁 Estructura de API

```
api/
├── health.js              # Health check
├── bingx/
│   └── [...path].js       # Proxy dinámico BingX
├── bitget/
│   └── [...path].js       # Proxy dinámico Bitget
├── mexc.js                # Proxy MEXC
├── proxy-bingx.js         # Legacy (deprecated)
├── proxy-bitget.js        # Legacy (deprecated)
└── proxy-mexc.js          # Legacy (deprecated)
```

### 🔐 Seguridad

- Las credenciales de API se almacenan en Supabase por usuario
- Las solicitudes se firman con HMAC SHA256
- Cada usuario solo puede acceder a sus propias credenciales
- Las claves nunca se exponen en el frontend

### 📊 Monitoreo

- Health check: `GET /api/health`
- Vercel Analytics: Activado automáticamente
- Logs: Disponibles en Vercel Dashboard

### 🌍 URLs de Producción

Una vez desplegado, tus URLs serán:
- **App**: `https://your-project.vercel.app`
- **API BingX**: `https://your-project.vercel.app/api/bingx/*`
- **API MEXC**: `https://your-project.vercel.app/api/mexc`
- **API Bitget**: `https://your-project.vercel.app/api/bitget/*`

### 🛠️ Troubleshooting

**Problema**: Las APIs no funcionan en producción
- Verifica que los headers CORS estén configurados
- Revisa los logs en Vercel Dashboard
- Asegúrate de que las credenciales estén guardadas en Supabase

**Problema**: Error de CORS
- Verifica que `vercel.json` tenga la configuración correcta
- Asegúrate de que los headers se envían correctamente

**Problema**: Firma inválida
- Verifica que las credenciales sean correctas
- Asegúrate de que el timestamp esté sincronizado

### 📝 Notas

- El servidor local (`server.js`) solo es para desarrollo
- En producción, Vercel usa las funciones serverless en `/api`
- La detección de entorno es automática (no requiere configuración)
