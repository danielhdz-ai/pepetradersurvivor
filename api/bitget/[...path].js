// Vercel Serverless Function para Bitget Proxy
// Maneja rutas dinámicas: /api/bitget/* -> https://api.bitget.com/*
import crypto from 'crypto';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, X-SECRET-KEY, X-PASSPHRASE, X-TIMESTAMP, Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Extraer el path: /api/bitget/api/v2/mix/order/fills -> /api/v2/mix/order/fills
        const { path = [] } = req.query;
        const endpoint = '/' + (Array.isArray(path) ? path.join('/') : path);
        const queryString = new URL(req.url, `http://${req.headers.host}`).search.slice(1);
        
        const apiKey = req.headers['x-api-key'];
        const secretKey = req.headers['x-secret-key'];
        const passphrase = req.headers['x-passphrase'];

        if (!apiKey || !secretKey || !passphrase) {
            return res.status(400).json({
                success: false,
                error: 'Faltan credenciales (X-API-KEY, X-SECRET-KEY, X-PASSPHRASE)'
            });
        }

        console.log('📡 Bitget Proxy Request:', {
            endpoint,
            method: req.method,
            hasQuery: !!queryString
        });

        const timestamp = req.headers['x-timestamp'] || Date.now().toString();
        const method = req.method.toUpperCase();
        const body = method === 'POST' ? JSON.stringify(req.body) : '';
        
        // Construir el path completo con query string
        const fullPath = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        // Prehash para firma: timestamp + method + path + body
        const prehash = `${timestamp}${method}${fullPath}${body}`;
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(prehash)
            .digest('base64');

        const url = `https://api.bitget.com${fullPath}`;

        console.log('🔗 Bitget URL:', url);

        const response = await fetch(url, {
            method: method,
            headers: {
                'ACCESS-KEY': apiKey,
                'ACCESS-SIGN': signature,
                'ACCESS-TIMESTAMP': timestamp,
                'ACCESS-PASSPHRASE': passphrase,
                'Content-Type': 'application/json',
                'locale': 'en-US'
            },
            body: method === 'POST' ? body : undefined
        });

        const data = await response.json();
        console.log('✅ Bitget Response:', data.code || 'received');

        return res.json(data);
    } catch (error) {
        console.error('❌ Bitget Proxy Error:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            details: 'Error en proxy Bitget'
        });
    }
}
