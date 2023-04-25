export default defineConfig({
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
        //   additionalData: '@import "@/assets/scss/global.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    },
 
  })
