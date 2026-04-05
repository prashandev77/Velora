/**
 * Reads the Avelora 5.0 SVG, prefixes all IDs and class names
 * so they don't collide with other SVGs on the page, then writes
 * the result to lib/avelora-logo-svg-markup.ts.
 *
 * Usage: node scripts/gen-logo-markup.mjs
 */
import fs from 'fs';

const PREFIX = 'av-';
const src = 'public/Avelora Travel Updated 5.0.svg';
const dest = 'lib/avelora-logo-svg-markup.ts';

let svg = fs.readFileSync(src, 'utf8');

// 1. Prefix all class names:  cls-N  →  av-cls-N
svg = svg.replace(/cls-(\d+)/g, `${PREFIX}cls-$1`);

// 2. Prefix IDs used by gradients and groups (url(#…), xlink:href="#…", id="…")
const idPatterns = [
  /id="(linear-gradient[^"]*)"/g,
  /id="(radial-gradient[^"]*)"/g,
  /url\(#(linear-gradient[^)]*)\)/g,
  /url\(#(radial-gradient[^)]*)\)/g,
  /xlink:href="#(linear-gradient[^"]*)"/g,
  /xlink:href="#(radial-gradient[^"]*)"/g,
];
for (const pat of idPatterns) {
  svg = svg.replace(pat, (match, name) =>
    match.replace(name, `${PREFIX}${name}`)
  );
}

// 3. Prefix the Layer_1 id to avoid collision
svg = svg.replace('id="Layer_1"', `id="${PREFIX}Layer_1"`);

// Keep #travel as-is — our CSS targets it
// Keep the data-name attribute as-is

const ts = `/** Auto-generated — run: node scripts/gen-logo-markup.mjs */
export const AVELORA_LOGO_SVG_MARKUP: string = ${JSON.stringify(svg)};
`;

fs.writeFileSync(dest, ts);
console.log('Wrote', dest, `(${svg.length} chars)`);
