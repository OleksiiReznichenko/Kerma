import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // target: 'server',
    ssr: false,
    app: {
        head: {
            title: "Kerma's game",
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/projects/Kerma/favicon.png' },
                // { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
                { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap', as: 'style' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap' },
                { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap', as: 'style' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap' },
            ],
            script: [
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"
                },
                {
                    src: "/projects/Kerma/librariesScript.js"
                    // src: "/librariesScript.js"
                }
            ]
        },
        
        baseURL: '/projects/Kerma/'
    },

    css: [
        '@/assets/css/style.css',
    ],

    modules: [
        '@pinia/nuxt',
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/variables.scss"; @import "@/assets/scss/mixins.scss";'
                },
            },
        },
    },

    build: {
        transpile: ['three']
    }
})
