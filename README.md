# 🚀 Vue3 项目初始化模板教程（基于 pnpm）

本教程目标：快速搭建一个 **Vue3 + Vite + Pinia + Element Plus + Axios** 的标准项目模板，避免每次新建项目都重复初始化工作。

------

## 1️⃣ 使用 pnpm 创建项目

**为什么选择 pnpm？**

- 比 npm/yarn 快 **2 倍左右**
- 节省磁盘空间（硬链接/符号链接）
- 更加高效的依赖管理

👉 安装 pnpm：

```bash
npm install -g pnpm
```

👉 创建 Vue 项目：

```bash
pnpm create vue
```

根据提示选择 **Vue3 + Vite + JavaScript/TypeScript（根据需要）**。

------

## 2️⃣ 调整项目目录结构

默认生成的目录不符合我们的开发习惯，因此需要清理和改造：

### （1）删除不需要的文件

```bash
src/assets/     # 清空
src/components/ # 清空
src/stores/     # 清空
src/views/      # 清空
```

### （2）修改核心文件

**src/router/index.js**

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
```

**src/App.vue**

```vue
<script setup></script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
```

**src/main.js**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

### （3）新增常用目录

```
src/
  ├─ api/      # 接口管理
  ├─ utils/    # 工具函数
  ├─ stores/   # Pinia 仓库
```

------

## 3️⃣ 引入 Element Plus 组件库

👉 安装

```bash
pnpm add element-plus
```

👉 按需自动导入
 安装插件：

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

修改 `vite.config.js`：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] })
  ]
})
```

👉 示例使用

```vue
<template>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
</template>
```

👉 安装图标库

```bash
pnpm add @element-plus/icons-vue
```

------

## 4️⃣ Pinia 状态管理 + 持久化

👉 安装持久化插件：

```bash
pnpm add pinia-plugin-persistedstate -D
```

👉 main.js 配置：

```js
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

app.use(pinia)
```

👉 示例仓库 `stores/user.js`

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (t) => (token.value = t)
    return { token, setToken }
  },
  { persist: true }
)
```

👉 统一导出仓库（推荐）
 `stores/index.js`

```js
export * from './modules/user'
```

------

## 5️⃣ Axios 封装（请求工具）

👉 安装 axios

```bash
pnpm add axios
```

👉 封装 `utils/request.js`

```js
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) return res.data
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage.error(err.response?.data?.message || '服务异常')
    if (err.response?.status === 401) router.push('/login')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
```

------

## 6️⃣ 登录访问拦截

👉 在 `router/index.js` 添加：

```js
import { useUserStore } from '@/stores/user'

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})
```



## 7️⃣ 启动项目

完成以上配置后，启动开发服务器：

```
//pnpm install
pnpm dev
```

访问地址：

👉 默认情况下：http://localhost:5173

