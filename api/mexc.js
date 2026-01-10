// Vercel Serverless Function para MEXC Proxy
// Maneja: POST /api/mexc con body { apiKey, secretKey, endpoint, params }
import crypto from 'crypto';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-MEXC-APIKEY, Request-Time, Signature');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed. Use POST.' 
        });
    }

    try {
        const { apiKey, secretKey, endpoint, params = {} } = req.body;

        if (!apiKey || !secretKey || !endpoint) {
            return res.status(400).json({
                success: false,
                error: 'Faltan apiKey, secretKey o endpoint en el body'
            });
        }

        console.log('📡 MEXC Proxy Request:', {
            endpoint,
            params: Object.keys(params)
        });

        const timestamp = Date.now().toString();
        
        // Ordenar parámetros alfabéticamente para MEXC
        const sortedParams = Object.keys(params)
            .sort()
            .reduce((acc, key) => {
                acc[key] = params[key];
                return acc;
            }, {});

        const queryString = new URLSearchParams(sortedParams).toString();
        
        // Firma MEXC: apiKey + timestamp + queryString
        const signString = `${apiKey}${timestamp}${queryString}`;
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(signString)
            .digest('hex');

        const url = `https://contract.mexc.com${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('🔗 MEXC URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MEXC-APIKEY': apiKey,
                'Request-Time': timestamp,
                'Signature': signature
            }
        });

        const data = await response.json();
        console.log('✅ MEXC Response:', data.success !== undefined ? data.success : 'received');

        return res.json(data);
    } catch (error) {
        console.error('❌ MEXC Proxy Error:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            details: 'Error en proxy MEXC'
        });
    }
}
