import fs from 'node:fs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath) throw new Error('Usage: node audit.mjs <input.json> [output.json]');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const fonts = new Map(Object.entries(data.fonts ?? {}).map(([name, codes]) => [name, new Set(codes)]));

const results = (data.fields ?? []).map((field) => {
  const coverage = fonts.get(field.font);
  if (!coverage) return { field: field.field, font: field.font, error: 'UNKNOWN_FONT', missing: [] };
  const missing = new Set();
  for (const text of field.strings ?? []) {
    for (const character of String(text)) {
      const codepoint = character.codePointAt(0);
      if (!/\s/u.test(character) && !coverage.has(codepoint)) missing.add(codepoint);
    }
  }
  return { field: field.field, font: field.font, missing: [...missing].sort((a, b) => a - b) };
});

const defectCount = results.reduce((n, row) => n + row.missing.length + (row.error ? 1 : 0), 0);
const report = { fieldCount: results.length, defectCount, results };
const json = JSON.stringify(report, null, 2) + '\n';
if (outputPath) fs.writeFileSync(outputPath, json, { flag: 'wx' }); else process.stdout.write(json);
process.exitCode = defectCount ? 1 : 0;
