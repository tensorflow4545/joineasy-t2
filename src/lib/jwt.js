const textEncoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;

function base64UrlEncode(bytes) {
  let str = typeof bytes === 'string' ? btoa(bytes) : btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToString(b64url) {
  try {
    const pad = b64url.length % 4 === 2 ? '==' : b64url.length % 4 === 3 ? '=' : '';
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + pad;
    return atob(b64);
  } catch (_e) {
    return '';
  }
}

async function importHmacKey(secret) {
  const keyData = textEncoder.encode(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );
}

export async function signToken(payload, secret, expiresInSeconds = 7200) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { iat: now, exp: now + expiresInSeconds, ...payload };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(body));
  const data = `${headerB64}.${payloadB64}`;

  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(data));
  const sigB64 = base64UrlEncode(signature);
  return `${data}.${sigB64}`;
}

export function getTokenPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payloadJson = base64UrlDecodeToString(parts[1]);
  try {
    return JSON.parse(payloadJson);
  } catch (_e) {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = getTokenPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}


