export const CONTENT_LOADERS = {
  cub: async () => (await import('./programmeContents')).CUB_CONTENT,
  sct: async () => (await import('./programmeContents')).SCT_CONTENT,
  vts: async () => (await import('./programmeContents')).VTS_CONTENT,
  rvs: async () => (await import('./programmeContents')).RVS_CONTENT,
} as const

export type ContentKey = keyof typeof CONTENT_LOADERS
