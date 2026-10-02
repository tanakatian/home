<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findDoc } from '@/lib/docs'
import { renderMarkdown } from '@/lib/markdown'

const route = useRoute()

const doc = computed(() => {
  const category = typeof route.params.category === 'string' ? route.params.category : ''
  const chapter = typeof route.params.chapter === 'string' ? route.params.chapter : ''
  const name = typeof route.params.doc === 'string' ? route.params.doc : ''
  if (!category || !chapter || !name) return undefined
  return findDoc(category, chapter, name)
})

const htmlContent = computed(() => (doc.value ? renderMarkdown(doc.value.content) : ''))
</script>

<template>
  <div class="markdown-view">
    <a-result
      v-if="!doc"
      status="404"
      title="文档不存在"
      sub-title="请从左侧菜单选择文档"
    />
    <article v-else class="markdown-content" v-html="htmlContent" />
  </div>
</template>

<style scoped>
.markdown-view {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 3rem;
  margin: 0 auto;
}

.markdown-content {
  line-height: 1.7;
  color: var(--color-text);
}

.markdown-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.markdown-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--color-border);
}

.markdown-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.markdown-content p {
  margin: 1rem 0;
}

.markdown-content a {
  color: var(--color-accent);
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.9em;
  background: var(--color-background-muted);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.markdown-content pre {
  background: var(--color-background-muted);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown-content ul,
.markdown-content ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin: 0.5rem 0;
}

.markdown-content blockquote {
  border-left: 4px solid var(--color-accent);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--color-text-muted);
  font-style: italic;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  text-align: left;
}

.markdown-content th {
  background: var(--color-background-muted);
  font-weight: 600;
}

.markdown-content hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .markdown-view {
    padding: 1rem;
  }
}
</style>
