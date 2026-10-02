<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { MenuOutlined } from '@ant-design/icons-vue'
import { categories, firstDocOfCategory } from '@/lib/docs'

const route = useRoute()
const router = useRouter()

const emit = defineEmits<{
  toggleMenu: []
}>()

const menuItems = computed(() =>
  categories.map((category) => ({
    key: category.name,
    label: category.name,
  })),
)

const selectedKeys = computed(() => {
  const category = route.params.category
  return typeof category === 'string' ? [category] : []
})

const handleMenuClick = ({ key }: { key: string | number }) => {
  const doc = firstDocOfCategory(String(key))
  if (doc) router.push(doc.path)
}
</script>

<template>
  <a-layout-header class="top-menu">
    <div class="menu-container">
      <RouterLink to="/" class="logo">MyPage</RouterLink>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        class="menu-list"
        :items="menuItems"
        @click="handleMenuClick"
      />
      <a-button
        type="text"
        class="mobile-menu-btn"
        aria-label="切换菜单"
        @click="emit('toggleMenu')"
      >
        <template #icon>
          <MenuOutlined />
        </template>
      </a-button>
    </div>
  </a-layout-header>
</template>

<style scoped>
.top-menu {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 0 1rem;
  height: 56px;
  line-height: 56px;
}

.menu-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 100%;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;
}

.menu-list {
  flex: 1;
  min-width: 0;
  border-bottom: none;
  background: transparent;
  line-height: 54px;
}

.mobile-menu-btn {
  display: none;
}

@media (max-width: 768px) {
  .menu-list {
    display: none;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }
}
</style>
