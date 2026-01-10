// Vercel Serverless Function para Bitget Proxy
// Maneja rutas: /api/bitget/*
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
        // Extraer el endpoint de la URL: /api/bitget/api/v2/mix/order/fills -> /api/v2/mix/order/fills
        const fullPath = req.url.replace(/^\/api\/bitget/, '') || req.url;
        
        const apiKey = req.headers['x-api-key'];
        const secretKey = req.headers['x-secret-key'];
        const passphrase = req.headers['x-passphrase'];

        if (!apiKey || !secretKey || !passphrase) {
            return res.status(400).json({
                success: false,
                error: 'Faltan credenciales (X-API-KEY, X-SECRET-KEY, X-PASSPHRASE)'
            });
        }

        const timestamp = req.headers['x-timestamp'] || Date.now().toString();
        const method = req.method.toUpperCase();
        const body = method === 'POST' ? JSON.stringify(req.body) : '';
        
        // Prehash incluye query string completo
        const prehash = `${timestamp}${method}${fullPath}${body}`;
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(prehash)
            .digest('base64');

        const url = `https://api.bitget.com${fullPath}`;

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
            body: body || undefined
        });

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error('❌ Bitget Proxy Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
