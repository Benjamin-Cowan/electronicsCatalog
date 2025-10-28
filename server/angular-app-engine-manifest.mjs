
export default {
  basePath: 'https://Benjamin-Cowan.github.io/electronicsCatalog',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
