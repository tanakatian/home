<script setup lang="ts">
import { ref } from 'vue'
import TopMenu from './TopMenu.vue'
import TreeMenu from './TreeMenu.vue'
import MarkdownView from './MarkdownView.vue'

const collapsed = ref(false)
</script>

<template>
  <a-layout class="docs-layout">
    <TopMenu @toggle-menu="collapsed = !collapsed" />

    <a-layout class="docs-container">
      <a-layout-sider
        v-model:collapsed="collapsed"
        class="sidebar"
        :width="280"
        :collapsed-width="0"
        breakpoint="lg"
        :trigger="null"
        theme="light"
      >
        <TreeMenu />
      </a-layout-sider>

      <a-layout-content class="main-content">
        <MarkdownView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.docs-layout {
  min-height: 100vh;
}

.docs-container {
  flex: 1;
  min-height: 0;
}

.sidebar {
  background: var(--color-background);
  border-right: 1px solid var(--color-border);
}

.sidebar :deep(.ant-layout-sider-children) {
  height: 100%;
}

.main-content {
  min-width: 0;
  background: var(--color-background);
}
</style>
