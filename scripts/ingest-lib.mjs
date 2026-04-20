import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootDir = path.resolve(__dirname, '..');
export const rawDir = path.resolve(rootDir, '../bilibili/raw');
export const episodesDir = path.join(rootDir, 'content/episodes');
export const workbenchDir = path.join(rootDir, 'workbench');

export function normalizeTitle(rawTitle) {
  return rawTitle
    .replace(/怪力乱谈\d+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[#＃].*$/g, '')
    .replace(/[。]+$/g, '')
    .trim();
}

export function cleanToken(value) {
  return value
    .replace(/^[#＃\s]+/, '')
    .replace(/[｜|]+/g, ' ')
    .replace(/[“”"'`]/g, '')
    .replace(/[。！，、,.!?？]+$/g, '')
    .trim();
}

export function deriveTags(rawTitle) {
  const tags = new Set();
  const hashtagMatches = rawTitle.match(/[#＃]([^\s#＃]+)/g) || [];
  for (const match of hashtagMatches) {
    const token = cleanToken(match);
    if (token.length >= 2) tags.add(token);
  }

  for (const part of rawTitle.split('｜')) {
    const token = cleanToken(part);
    if (token.length >= 2 && token.length <= 16) tags.add(token);
  }

  return [...tags].slice(0, 8);
}

export function extractTranscript(rawText) {
  return rawText
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (/^\d+$/.test(trimmed)) return false;
      if (trimmed.includes('-->')) return false;
      return true;
    })
    .join('\n');
}

export function createEpisodeDraft({ id, title, tags }) {
  return {
    id,
    title,
    status: 'draft',
    summary: '待整理',
    tags,
    people: [],
    themes: [],
    concepts: [],
    models: [],
    relatedEpisodes: [],
    topic: {
      background: '待补充',
      conflicts: [],
      boundaries: [],
      mechanism: '待补充',
      extensions: []
    },
    viewpoints: [
      {
        title: '待补充观点 1',
        body: '待补充'
      }
    ],
    extensions: []
  };
}

export function createIntakeNote({ id, title, sourceFile, transcriptFile, tags }) {
  const tagLines = tags.length ? tags.map((tag) => `- ${tag}`).join('\n') : '- 暂无自动提取标签';
  return `# ${id} Intake

## 基本信息

- 节目编号: ${id}
- 标题: ${title}
- 原始文件: ${sourceFile}
- 纯文本转写: ${transcriptFile}

## 自动提取标签候选

${tagLines}

## 整理流程

1. 阅读 \`${path.basename(transcriptFile)}\`，先理解节目主线。
2. 编辑 \`content/episodes/${id}.json\`，补完：
   - \`summary\`
   - \`topic.background / conflicts / boundaries / mechanism / extensions\`
   - \`viewpoints\`
   - \`extensions\`
3. 把需要沉淀的稳定概念补到：
   - \`content/concepts/*.json\`
4. 把对应的思想模型补到：
   - \`content/models/*.json\`
5. 把节目里明确出现的人物、主题、关键词补到：
   - \`content/people/*.json\`
   - \`content/themes/*.json\`
   - \`content/keywords/*.json\`
6. 回到节目 JSON，把 \`people / themes / concepts / models / relatedEpisodes\` 链接补齐。
7. 执行 \`npm run build\` 或重新运行导入脚本。

## 当前状态

- [ ] 节目草稿已补全
- [ ] 概念已补全
- [ ] 思想模型已补全
- [ ] 人物 / 主题 / 关键词已补全
- [ ] 页面已验证
`;
}

export async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureBaseDirs() {
  await Promise.all([
    fs.mkdir(rawDir, { recursive: true }),
    fs.mkdir(episodesDir, { recursive: true }),
    fs.mkdir(workbenchDir, { recursive: true })
  ]);
}

export function parseEpisodeFileName(fileName) {
  const match = fileName.match(/^\[(EP\d{3})】\s*(.+)\.(srt|md)$/i);
  if (!match) return null;
  return {
    id: match[1],
    rawTitle: match[2],
    ext: match[3].toLowerCase()
  };
}
