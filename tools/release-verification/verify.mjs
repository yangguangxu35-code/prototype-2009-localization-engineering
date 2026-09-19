import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [rootPath, manifestPath] = process.argv.slice(2);
if (!rootPath || !manifestPath) throw new Error('Usage: node verify.mjs <root-directory> <manifest.json>');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const hashFile = (file) => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha256');
  const input = fs.createReadStream(file);
  input.on('data', (chunk) => hash.update(chunk));
  input.on('error', reject);
  input.on('end', () => resolve(hash.digest('hex').toUpperCase()));
});

const expected = new Map((manifest.files ?? []).map((entry) => [entry.path.replace(/\\/g, '/'), String(entry.sha256).toUpperCase()]));
const rows = [];
for (const [relative, sha256] of expected) {
  const file = path.join(rootPath, ...relative.split('/'));
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) rows.push({ path: relative, status: 'MISSING' });
  else {
    const actual = await hashFile(file);
    rows.push({ path: relative, status: actual === sha256 ? 'PASS' : 'HASH_MISMATCH', expected: sha256, actual });
  }
}
const walk = (dir, prefix = '') => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
  return entry.isDirectory() ? walk(path.join(dir, entry.name), relative) : [relative];
});
const extras = walk(rootPath).filter((relative) => !expected.has(relative)).sort();
const failed = rows.some((row) => row.status !== 'PASS') || extras.length > 0;
process.stdout.write(JSON.stringify({ failed, rows, extras }, null, 2) + '\n');
process.exitCode = failed ? 1 : 0;
