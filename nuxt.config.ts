// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    modules: [
        [
            '@pinia/nuxt', {
                autoImports: [
                    // 自动引入 `defineStore()`
                    'defineStore',
                    // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            }
        ],
        '@element-plus/nuxt',
        '@vueuse/nuxt',
    ],

    css: ["element-plus/theme-chalk/dark/css-vars.css", "@/assets/css/global.css"],

    head: {
        title: 'My English',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'keywords', content: 'English' },
            { hid: 'description', name: 'description', content: 'This is my English website.' }
        ],
    },
})