import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = new URL('../public/', import.meta.url);
const input = path.join(publicDir.pathname, 'logo.png');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-64x64.png', size: 64 },
  { name: 'favicon-128x128.png', size: 128 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

const pngFiles = [];
for (const item of sizes) {
  const out = path.join(publicDir.pathname, item.name);
  await sharp(input)
    .resize(item.size, item.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  pngFiles.push(out);
  console.log('Wrote', item.name);
}

const icoOut = path.join(publicDir.pathname, 'favicon.ico');
await sharp(input)
  .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(icoOut);
console.log('Wrote favicon.ico');

console.log('Done generating favicons from logo.png');
