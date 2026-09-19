import fs from 'node:fs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath) throw new Error('Usage: node audit.mjs <input.json> [output.json]');
const entries = JSON.parse(fs.readFileSync(inputPath, 'utf8')).entries ?? [];

const rows = entries.map((entry) => {
  const hasEnglish = /[A-Za-z]{2,}/.test(String(entry.text ?? ''));
  let classification = 'NON_ENGLISH';
  if (entry.internal || entry.visible === false) classification = 'INTERNAL_OR_NOT_VISIBLE';
  else if (entry.approvedFallback) classification = 'APPROVED_FALLBACK';
  else if (entry.visible === true && hasEnglish) classification = 'CONFIRMED_VISIBLE_ENGLISH';
  return { id: entry.id ?? null, classification };
});

const counts = rows.reduce((out, row) => ((out[row.classification] = (out[row.classification] ?? 0) + 1), out), {});
const report = { entryCount: rows.length, counts, rows };
const json = JSON.stringify(report, null, 2) + '\n';
if (outputPath) fs.writeFileSync(outputPath, json, { flag: 'wx' }); else process.stdout.write(json);
process.exitCode = counts.CONFIRMED_VISIBLE_ENGLISH ? 1 : 0;
