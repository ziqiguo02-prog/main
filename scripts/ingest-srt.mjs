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
  rawDir,
  rootDir,
  workbenchDir
} from './ingest-lib.mjs';

const execFileAsync = promisify(execFile);

function usage() {
  console.log(`
用法:
  npm run srt -- "/绝对或相对路径/[EP123】 标题.srt"
  npm run srt -- --force "/绝对或相对路径/[EP123】 标题.srt"

作用:
  1. 把 srt/md 收录到 bilibili/raw
  2. 抽取纯文本 transcript 到 网页/workbench/EPxxx/
  3. 生成节目草稿 JSON
  4. 生成 intake 工作笔记
  5. 自动重建网页 dist
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('-h') || args.includes('--help')) {
    usage();
    return;
  }

  const force = args.includes('--force');
  const sourceArg = args.find((arg) => !arg.startsWith('--'));
  if (!sourceArg) {
    usage();
    process.exitCode = 1;
    return;
  }

  const sourcePath = path.resolve(process.cwd(), sourceArg);
  const sourceExists = await exists(sourcePath);
  if (!sourceExists) {
    console.error(`找不到文件: ${sourcePath}`);
    process.exitCode = 1;
    return;
  }

  const sourceBase = path.basename(sourcePath);
  const match = sourceBase.match(/^\[(EP\d{3})】\s*(.+)\.(srt|md)$/i);
  if (!match) {
    console.error('文件名必须符合 [EPxxx】 标题.srt 或 [EPxxx】 标题.md 格式。');
    process.exitCode = 1;
    return;
  }

  const [, id, rawTitle] = match;
  const title = normalizeTitle(rawTitle);
  const tags = deriveTags(rawTitle);
  const rawTarget = path.join(rawDir, sourceBase);
  const sourceText = await fs.readFile(sourcePath, 'utf8');
  const transcript = extractTranscript(sourceText);

  await ensureBaseDirs();

  if (path.resolve(sourcePath) !== path.resolve(rawTarget)) {
    if (!(await exists(rawTarget)) || force) {
      await fs.copyFile(sourcePath, rawTarget);
      console.log(`已复制到 raw: ${rawTarget}`);
    } else {
      console.log(`raw 中已存在同名文件，跳过复制: ${rawTarget}`);
    }
  } else {
    console.log(`源文件已在 raw 中: ${rawTarget}`);
  }

  const episodeWorkbenchDir = path.join(workbenchDir, id);
  await fs.mkdir(episodeWorkbenchDir, { recursive: true });

  const transcriptPath = path.join(episodeWorkbenchDir, `${id}.transcript.txt`);
  await fs.writeFile(transcriptPath, transcript, 'utf8');
  console.log(`已写入纯文本 transcript: ${transcriptPath}`);

  const intakePath = path.join(episodeWorkbenchDir, `${id}.intake.md`);
  await fs.writeFile(
    intakePath,
    createIntakeNote({
      id,
      title,
      sourceFile: rawTarget,
      transcriptFile: transcriptPath,
      tags
    }),
    'utf8'
  );
  console.log(`已写入 intake 笔记: ${intakePath}`);

  const episodeJsonPath = path.join(episodesDir, `${id}.json`);
  if (!(await exists(episodeJsonPath)) || force) {
    const draft = createEpisodeDraft({ id, title, tags });
    await fs.writeFile(episodeJsonPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
    console.log(`已生成节目草稿: ${episodeJsonPath}`);
  } else {
    console.log(`节目草稿已存在，跳过覆盖: ${episodeJsonPath}`);
  }

  await execFileAsync('node', ['build.mjs'], { cwd: rootDir });
  console.log('已自动重建网页 dist');
  console.log('');
  console.log('下一步建议:');
  console.log(`1. 编辑 ${episodeJsonPath}`);
  console.log(`2. 参考 ${intakePath}`);
  console.log(`3. 运行 npm run serve 或刷新现有 localhost 页面`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
