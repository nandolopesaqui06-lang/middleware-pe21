import 'dotenv/config';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  console.error('Error: JWT_SECRET no está definido. Usa JWT_SECRET en el entorno.');
  process.exit(1);
}

const argv = process.argv.slice(2);
const subject = argv[0] ?? 'user@example.com';
const issuer = argv[1] ?? 'api_diego';
const audience = argv[2] ?? 'api_clients';
const scope = argv[3] ?? 'read';
const expirationSeconds = 60 * 60; // 1 hora

const header = {
  alg: 'HS256',
  typ: 'JWT'
};

const now = Math.floor(Date.now() / 1000);
const payload = {
  sub: subject,
  iss: issuer,
  aud: audience,
  scope,
  exp: now + expirationSeconds,
  jti: crypto.randomUUID()
};

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const encodedHeader = base64UrlEncode(JSON.stringify(header));
const encodedPayload = base64UrlEncode(JSON.stringify(payload));
const unsignedToken = `${encodedHeader}.${encodedPayload}`;
const signature = crypto
  .createHmac('sha256', JWT_SECRET)
  .update(unsignedToken)
  .digest('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

const token = `${unsignedToken}.${signature}`;
console.log(token);
