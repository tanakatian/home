<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buildDocPath, findCategory } from '@/lib/docs'

interface MenuItem {
  key: string
  label: string
  children?: MenuItem[]
}

const route = useRoute()
const router = useRouter()

const currentCategory = computed(() => {
  const category = route.params.category
  return typeof category === 'string' ? category : ''
})

const menuItems = computed<MenuItem[]>(() => {
  const category = findCategory(currentCategory.value)
  if (!category) return []
  return category.chapters.map((chapter) => ({
    key: chapter.name,
    label: chapter.name,
    children: chapter.docs.map((doc) => ({
      key: doc.path,
      label: doc.name,
    })),
  }))
})

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

watch(currentCategory, () => {
  openKeys.value = []
})

watch(
  () => [route.params.category, route.params.chapter, route.params.doc],
  () => {
    const category = typeof route.params.category === 'string' ? route.params.category : ''
    const chapter = typeof route.params.chapter === 'string' ? route.params.chapter : ''
    const doc = typeof route.params.doc === 'string' ? route.params.doc : ''
    if (category && chapter && doc) {
      selectedKeys.value = [buildDocPath(category, chapter, doc)]
      if (!openKeys.value.includes(chapter)) {
        openKeys.value = [...openKeys.value, chapter]
      }
    } else {
      selectedKeys.value = []
    }
  },
  { immediate: true },
)

const handleMenuClick = ({ key }: { key: string | number }) => {
  const path = String(key)
  if (path.startsWith('/docs/')) router.push(path)
}
</script>

<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    class="tree-menu"
    :items="menuItems"
    @click="handleMenuClick"
  />
</template>

<style scoped>
.tree-menu {
  height: 100%;
  overflow-y: auto;
  border-right: none;
  padding: 0.5rem 0;
}
</style>
