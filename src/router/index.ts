import { createRouter, createWebHistory } from 'vue-router'
import { firstDoc, firstDocOfCategory, firstDocOfChapter } from '@/lib/docs'

const fallback = () => firstDoc()?.path ?? '/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: fallback,
    },
    {
      path: '/docs',
      redirect: fallback,
    },
    {
      path: '/docs/:category',
      redirect: (to) => {
        const category = typeof to.params.category === 'string' ? to.params.category : ''
        return firstDocOfCategory(category)?.path ?? fallback()
      },
    },
    {
      path: '/docs/:category/:chapter',
      redirect: (to) => {
        const category = typeof to.params.category === 'string' ? to.params.category : ''
        const chapter = typeof to.params.chapter === 'string' ? to.params.chapter : ''
        return firstDocOfChapter(category, chapter)?.path ?? fallback()
      },
    },
    {
      path: '/docs/:category/:chapter/:doc',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
  ],
})

export default router
