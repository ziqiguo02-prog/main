import fs from 'fs/promises';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import {
  createEpisodeDraft,
  createIntakeNote,
  deriveTags,
  ensureBaseDirs,
  episodesDir,
  exists,
  extractTranscript,
  normalizeTitle,
  parseEpisodeFileName,
  rawDir,
  rootDir,
  workbenchDir
} from './ingest-lib.mjs';

const execFileAsync = promisify(execFile);

function pickPreferredSource(current, next) {
  if (!current) return next;
  if (current.ext === 'md') return current;
  if (next.ext === 'md') return next;
  return current;
}

async function main() {
  await ensureBaseDirs();

  const entries = await fs.readdir(rawDir, { withFileTypes: true });
  const byEpisode = new Map();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const parsed = parseEpisodeFileName(entry.name);
    if (!parsed) continue;
    const candidate = {
      ...parsed,
      fileName: entry.name,
      fullPath: path.join(rawDir, entry.name)
    };
    byEpisode.set(parsed.id, pickPreferredSource(byEpisode.get(parsed.id), candidate));
  }

  let created = 0;
  let skipped = 0;

  for (const source of [...byEpisode.values()].sort((a, b) => a.id.localeCompare(b.id))) {
    const title = normalizeTitle(source.rawTitle);
    const tags = deriveTags(source.rawTitle);
    const episodeJsonPath = path.join(episodesDir, `${source.id}.json`);

    if (await exists(episodeJsonPath)) {
      skipped += 1;
      continue;
    }

    const sourceText = await fs.readFile(source.fullPath, 'utf8');
    const transcript = extractTranscript(sourceText);

    const episodeWorkbenchDir = path.join(workbenchDir, source.id);
    await fs.mkdir(episodeWorkbenchDir, { recursive: true });

    const transcriptPath = path.join(episodeWorkbenchDir, `${source.id}.transcript.txt`);
    await fs.writeFile(transcriptPath, transcript, 'utf8');

    const intakePath = path.join(episodeWorkbenchDir, `${source.id}.intake.md`);
    await fs.writeFile(
      intakePath,
      createIntakeNote({
        id: source.id,
        title,
        sourceFile: source.fullPath,
        transcriptFile: transcriptPath,
        tags
      }),
      'utf8'
    );

    const draft = createEpisodeDraft({ id: source.id, title, tags });
    await fs.writeFile(episodeJsonPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
    created += 1;
  }

  await execFileAsync('node', ['build.mjs'], { cwd: rootDir });

  console.log(`Missing episodes scaffolded: ${created}`);
  console.log(`Existing episodes skipped: ${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
