// Vercel Serverless Function para BingX Proxy
// Maneja rutas dinámicas: /api/bingx/* -> https://open-api.bingx.com/*
import crypto from 'crypto';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, X-SECRET-KEY, X-ACCOUNT-ID, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Extraer el path: /api/bingx/openApi/swap/v2/user/balance -> /openApi/swap/v2/user/balance
        const { path = [] } = req.query;
        const endpoint = '/' + (Array.isArray(path) ? path.join('/') : path);
        const queryString = new URL(req.url, `http://${req.headers.host}`).search.slice(1);
        
        const apiKey = req.headers['x-api-key'];
        const secretKey = req.headers['x-secret-key'];

        console.log('📡 BingX Proxy Request:', {
            endpoint,
            method: req.method,
            hasAuth: !!(apiKey && secretKey)
        });

        // Si no hay credenciales, puede ser una llamada pública
        if (!apiKey || !secretKey) {
            const url = `https://open-api.bingx.com${endpoint}${queryString ? '?' + queryString : ''}`;
            const response = await fetch(url, {
                method: req.method,
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            return res.json(data);
        }

        // Request autenticada
        const timestamp = Date.now().toString();
        
        // Parsear parámetros existentes del query string
        const existingParams = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};
        
        // Construir query string con timestamp
        const params = new URLSearchParams({
            ...existingParams,
            timestamp: timestamp
        });
        const finalQueryString = params.toString();

        // Generar firma BingX: HMAC SHA256 del query string
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(finalQueryString)
            .digest('hex');

        const url = `https://open-api.bingx.com${endpoint}?${finalQueryString}&signature=${signature}`;

        console.log('🔗 BingX URL:', url.replace(signature, 'SIGNATURE').replace(apiKey, 'APIKEY'));

        const response = await fetch(url, {
            method: req.method,
            headers: {
                'X-BX-APIKEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        });

        const data = await response.json();
        console.log('✅ BingX Response:', data.code || data.msg || 'success');
        
        return res.json(data);
    } catch (error) {
        console.error('❌ BingX Proxy Error:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            details: 'Error en proxy BingX'
        });
    }
}
