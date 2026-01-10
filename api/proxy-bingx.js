// Vercel Serverless Function para BingX Proxy
// Maneja rutas: /api/bingx/*
import crypto from 'crypto';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, X-SECRET-KEY, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Extraer el endpoint de la URL: /api/bingx/openApi/swap/v2/user/balance -> /openApi/swap/v2/user/balance
        const fullPath = req.url.replace(/^\/api\/bingx/, '') || req.url;
        const [endpoint, queryPart] = fullPath.split('?');
        
        const apiKey = req.headers['x-api-key'];
        const secretKey = req.headers['x-secret-key'];

        // Si no hay credenciales, puede ser una llamada pública
        if (!apiKey || !secretKey) {
            // Endpoint público
            const url = `https://open-api.bingx.com${endpoint}${queryPart ? '?' + queryPart : ''}`;
            const response = await fetch(url, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return res.json(data);
        }

        // Request autenticada
        const timestamp = Date.now().toString();
        
        // Parsear parámetros existentes
        const existingParams = queryPart ? Object.fromEntries(new URLSearchParams(queryPart)) : {};
        
        // Construir query string con timestamp
        const queryParams = new URLSearchParams({
            ...existingParams,
            timestamp: timestamp
        });
        const queryString = queryParams.toString();

        // Generar firma BingX
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(queryString)
            .digest('hex');

        const url = `https://open-api.bingx.com${endpoint}?${queryString}&signature=${signature}`;

        const response = await fetch(url, {
            method: req.method,
            headers: {
                'X-BX-APIKEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        });

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error('❌ BingX Proxy Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
