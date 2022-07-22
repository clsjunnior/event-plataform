/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHCMS_URI: string
  readonly VITE_API_ACCESS_TOKEN: SVGAnimatedString
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
