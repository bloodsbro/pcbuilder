// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'nuxt-typeorm',
  ],
  runtimeConfig: {
    tokenSecret: process.env.HASH_TOKEN,
    tokenExpiration: 60 * 60 * 24 * 30,

    typeorm: {
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT || "3306"),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      type: "mysql",
    },
  },
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
          },
        },
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          strictPropertyInitialization: false,
        },
      },
    },
  },
})
