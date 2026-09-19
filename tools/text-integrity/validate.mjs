import fs from 'node:fs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath) throw new Error('Usage: node validate.mjs <input.json> [output.json]');

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const entries = Array.isArray(data.entries) ? data.entries : [];
const sorted = (values) => [...values].sort();
const equal = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
const patterns = {
  placeholders: /%\d+:[A-Z]+\d*|%(?:\d+\$)?[-+#0]*\d*(?:\.\d+)?[sdifuxX]/g,
  keys: /\$[A-Z][A-Z0-9_]+/g,
  tags: /<\/?[A-Za-z][^>]*>/g,
};
const tokens = (text, pattern) => sorted(String(text ?? '').match(pattern) ?? []);
const controls = (text) => sorted([...String(text ?? '')]
  .map((character) => character.charCodeAt(0))
  .filter((code) => code < 0x20 && ![9, 10, 13].includes(code)));
const newlines = (text) => (String(text ?? '').match(/\n/g) ?? []).length;

const results = entries.map((entry) => {
  const source = String(entry.source ?? '');
  const target = String(entry.target ?? '');
  const defects = [];
  for (const [name, pattern] of Object.entries(patterns)) {
    if (!equal(tokens(source, pattern), tokens(target, pattern))) defects.push(`${name}_changed`);
  }
  if (!equal(controls(source), controls(target))) defects.push('control_codes_changed');
  if (newlines(source) !== newlines(target)) defects.push('linebreak_count_changed');
  if (!target.length) defects.push('empty_target');
  return { id: entry.id ?? null, defects };
});

const report = { entryCount: results.length, defectCount: results.reduce((n, r) => n + r.defects.length, 0), results };
const json = JSON.stringify(report, null, 2) + '\n';
if (outputPath) fs.writeFileSync(outputPath, json, { flag: 'wx' }); else process.stdout.write(json);
process.exitCode = report.defectCount ? 1 : 0;
