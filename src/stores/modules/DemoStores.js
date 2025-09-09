import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const demoDemoStore = defineStore(
    'demo',
    () => {
        const name = ref('张三') // 定义 token
        const age = ref('18')

        return { name, age }
    },
    {
        persist: true // 持久化
    }
)
