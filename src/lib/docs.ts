export interface DocFile {
  /** 小分类（详细内容）名称，即 Markdown 文件名（不含扩展名） */
  name: string
  /** 完整路由路径，例如 /docs/C语言/基本语法/数据类型 */
  path: string
  /** Markdown 原始内容 */
  content: string
}

export interface Chapter {
  /** 中分类（章节）名称 */
  name: string
  docs: DocFile[]
}

export interface Category {
  /** 大分类名称 */
  name: string
  chapters: Chapter[]
}

const modules = import.meta.glob('../docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export function buildDocPath(category: string, chapter: string, doc: string): string {
  return `/docs/${category}/${chapter}/${doc}`
}

function buildCategories(): Category[] {
  const result: Category[] = []
  const categoryMap = new Map<string, Category>()
  const chapterMap = new Map<string, Chapter>()

  const keys = Object.keys(modules).sort()

  for (const key of keys) {
    const rel = key.slice('../docs/'.length).replace(/\.md$/, '')
    const parts = rel.split('/')
    if (parts.length !== 3) continue

    const categoryName = parts[0]
    const chapterName = parts[1]
    const docName = parts[2]
    if (!categoryName || !chapterName || !docName) continue

    let category = categoryMap.get(categoryName)
    if (!category) {
      category = { name: categoryName, chapters: [] }
      categoryMap.set(categoryName, category)
      result.push(category)
    }

    const chapterKey = `${categoryName}/${chapterName}`
    let chapter = chapterMap.get(chapterKey)
    if (!chapter) {
      chapter = { name: chapterName, docs: [] }
      chapterMap.set(chapterKey, chapter)
      category.chapters.push(chapter)
    }

    const content = modules[key]
    if (typeof content !== 'string') continue

    chapter.docs.push({
      name: docName,
      path: buildDocPath(categoryName, chapterName, docName),
      content,
    })
  }

  return result
}

export const categories: Category[] = buildCategories()

export function findCategory(name: string): Category | undefined {
  return categories.find((category) => category.name === name)
}

export function findChapter(categoryName: string, chapterName: string): Chapter | undefined {
  return findCategory(categoryName)?.chapters.find((chapter) => chapter.name === chapterName)
}

export function findDoc(categoryName: string, chapterName: string, docName: string): DocFile | undefined {
  return findChapter(categoryName, chapterName)?.docs.find((doc) => doc.name === docName)
}

export function firstDocOfChapter(categoryName: string, chapterName: string): DocFile | undefined {
  return findChapter(categoryName, chapterName)?.docs[0]
}

export function firstDocOfCategory(categoryName: string): DocFile | undefined {
  return findCategory(categoryName)?.chapters[0]?.docs[0]
}

export function firstDoc(): DocFile | undefined {
  return categories[0]?.chapters[0]?.docs[0]
}
