
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://Benjamin-Cowan.github.io/electronicsCatalog/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/electronicsCatalog"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5094, hash: 'b00cb5a5310c09be0ee560f45e01e236540dff3bd17decf2f040d67a192b8884', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1066, hash: '724a430661a3ee1ca10449881c3dad7b78d3e42cd68cfa1a92aac2d05dcdfc69', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6987, hash: 'da191f225ae01c546e375eba8280925352ba08fff5b1037d35c9fb7196964c76', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-EJ64O4U2.css': {size: 231346, hash: 'xJIMK6CoFs0', text: () => import('./assets-chunks/styles-EJ64O4U2_css.mjs').then(m => m.default)}
  },
};
