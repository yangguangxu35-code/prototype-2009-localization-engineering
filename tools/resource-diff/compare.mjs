import fs from 'node:fs';

const [basePath, candidatePath, allowlistPath, outputPath] = process.argv.slice(2);
if (!basePath || !candidatePath || !allowlistPath) throw new Error('Usage: node compare.mjs <base.json> <candidate.json> <allowlist.json> [output.json]');
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const toMap = (manifest) => new Map((manifest.resources ?? []).map((entry) => [entry.path, entry.sha256]));
const base = toMap(read(basePath));
const candidate = toMap(read(candidatePath));
const allowlist = new Set(read(allowlistPath));
const changed = [], added = [], removed = [];
for (const [path, hash] of candidate) {
  if (!base.has(path)) added.push(path);
  else if (base.get(path) !== hash) changed.push(path);
}
for (const path of base.keys()) if (!candidate.has(path)) removed.push(path);
const unexpected = [...changed, ...added, ...removed].filter((path) => !allowlist.has(path)).sort();
const report = { changed: changed.sort(), added: added.sort(), removed: removed.sort(), unexpected };
const json = JSON.stringify(report, null, 2) + '\n';
if (outputPath) fs.writeFileSync(outputPath, json, { flag: 'wx' }); else process.stdout.write(json);
process.exitCode = unexpected.length ? 1 : 0;
