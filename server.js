import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();
const PORT = 8003;

// Configurar CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'X-BX-APIKEY', 
    'X-MEXC-APIKEY', 
    'X-API-KEY', 
    'X-SECRET-KEY', 
    'X-PASSPHRASE',
    'X-TIMESTAMP',
    'X-ACCOUNT-ID',
    'ACCESS-KEY', 
    'ACCESS-SIGN', 
    'ACCESS-TIMESTAMP', 
    'ACCESS-PASSPHRASE',
    'Request-Time',
    'Signature'
  ]
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Proxy server running', port: PORT });
});

// BingX Proxy
app.all('/bingx/*', async (req, res) => {
  try {
    const path = req.params[0];
    const url = `https://open-api.bingx.com/${path}${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;
    
    console.log(`📡 BingX Proxy: ${req.method} ${url}`);
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Copiar headers de autenticación
    if (req.headers['x-bx-apikey']) {
      headers['X-BX-APIKEY'] = req.headers['x-bx-apikey'];
    }
    
    const options = {
      method: req.method,
      headers: headers
    };
    
    if (req.method !== 'GET' && req.body) {
      options.body = JSON.stringify(req.body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('❌ BingX Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// MEXC Proxy
app.post('/proxy-mexc', async (req, res) => {
  try {
    const { endpoint, params = {} } = req.body;
    const apiKey = req.headers['x-mexc-apikey'] || req.headers['x-api-key'];
    const secretKey = req.headers['x-secret-key'];
    
    if (!apiKey || !secretKey) {
      return res.status(400).json({
        success: false,
        error: 'Faltan credenciales (X-MEXC-APIKEY o X-API-KEY, X-SECRET-KEY)'
      });
    }
    
    const timestamp = Date.now();
    
    // Ordenar parámetros alfabéticamente
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    
    const queryString = new URLSearchParams(sortedParams).toString();
    
    // MEXC Signature = HmacSHA256(apiKey + timestamp + queryString, secretKey)
    const signaturePayload = apiKey + timestamp + queryString;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(signaturePayload)
      .digest('hex');
    
    const url = `https://contract.mexc.com${endpoint}${queryString ? '?' + queryString : ''}`;
    
    console.log(`📡 MEXC Proxy: POST ${url}`);
    console.log(`🔐 MEXC Signature Payload: ${signaturePayload.substring(0, 50)}...`);
    console.log(`🔐 MEXC Signature: ${signature.substring(0, 20)}...`);
    
    const headers = {
      'Content-Type': 'application/json',
      'ApiKey': apiKey,
      'Request-Time': timestamp.toString(),
      'Signature': signature
    };
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
    const data = await response.json();
    console.log('✅ MEXC Response:', data.success !== undefined ? data.success : 'received');
    res.json(data);
  } catch (error) {
    console.error('❌ MEXC Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Bitget Proxy
app.all('/proxy-bitget/*', async (req, res) => {
  try {
    const path = req.params[0];
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const fullPath = `/${path}${queryString}`;
    const url = `https://api.bitget.com${fullPath}`;
    
    const apiKey = req.headers['x-api-key'];
    const secretKey = req.headers['x-secret-key'];
    const passphrase = req.headers['x-passphrase'];
    
    if (!apiKey || !secretKey || !passphrase) {
      return res.status(400).json({
        success: false,
        error: 'Faltan credenciales (X-API-KEY, X-SECRET-KEY, X-PASSPHRASE)'
      });
    }
    
    console.log(`📡 Bitget Proxy: ${req.method} ${url}`);
    
    const timestamp = req.headers['x-timestamp'] || Date.now().toString();
    const method = req.method.toUpperCase();
    const body = method === 'POST' ? JSON.stringify(req.body) : '';
    
    // Prehash para firma: timestamp + method + path + body
    const prehash = `${timestamp}${method}${fullPath}${body}`;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(prehash)
      .digest('base64');
    
    console.log(`🔐 Bitget Server Prehash: ${prehash}`);
    console.log(`🔐 Bitget Server Signature: ${signature.substring(0, 20)}...`);
    
    const headers = {
      'ACCESS-KEY': apiKey,
      'ACCESS-SIGN': signature,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-PASSPHRASE': passphrase,
      'Content-Type': 'application/json',
      'locale': 'en-US'
    };
    
    const options = {
      method: method,
      headers: headers
    };
    
    if (method === 'POST' && body) {
      options.body = body;
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log('✅ Bitget Response:', data.code || 'received');
    res.json(data);
  } catch (error) {
    console.error('❌ Bitget Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// NinjaTrader Proxy (si se necesita)
app.all('/ninjatrader/*', async (req, res) => {
  try {
    const path = req.params[0];
    // Ajustar según la URL de NinjaTrader
    const url = `https://api.ninjatrader.com/${path}`;
    
    console.log(`📡 NinjaTrader Proxy: ${req.method} ${url}`);
    
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ NinjaTrader Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://127.0.0.1:${PORT}`);
  console.log(`📡 Health check: http://127.0.0.1:${PORT}/health`);
  console.log(`🔗 BingX proxy: http://127.0.0.1:${PORT}/bingx/*`);
  console.log(`🔗 MEXC proxy: http://127.0.0.1:${PORT}/proxy-mexc`);
  console.log(`🔗 Bitget proxy: http://127.0.0.1:${PORT}/proxy-bitget/*`);
});
