export const CONTENT_LOADERS = {
  cub: async () => (await import('./programmeContents')).CUB_CONTENT,
  sct: async () => (await import('./programmeContents')).SCT_CONTENT,
  vts: async () => (await import('./programmeContents')).VTS_CONTENT,
  rvs: async () => (await import('./programmeContents')).RVS_CONTENT,
  cub_bd: async () => (await import('./programmeContents')).CUB_BD_CONTENT,
  cub_vc: async () => (await import('./programmeContents')).CUB_VC_CONTENT,
  cub_nbd: async () => (await import('./programmeContents')).CUB_NBD_CONTENT,
  cub_tn: async () => (await import('./programmeContents')).CUB_TN_CONTENT,
  sct_bd: async () => (await import('./programmeContents')).SCT_BD_CONTENT,
  sct_vc: async () => (await import('./programmeContents')).SCT_VC_CONTENT,
  sct_nbd: async () => (await import('./programmeContents')).SCT_NBD_CONTENT,
  vts_bd: async () => (await import('./programmeContents')).VTS_BD_CONTENT,
  vts_vc: async () => (await import('./programmeContents')).VTS_VC_CONTENT,
  vts_nbd: async () => (await import('./programmeContents')).VTS_NBD_CONTENT,
  vts_tn: async () => (await import('./programmeContents')).VTS_TN_CONTENT,
} as const

export type ContentKey = keyof typeof CONTENT_LOADERS

export const IMAGES_LOADERS = {
  rvs: async () => (await import('./images')).RVS_IMAGES,
  cub: async () => (await import('./images')).CUB_IMAGES,
  sct_nbd: async () => (await import('./images')).SCT_NBD_IMAGES,
  sct_vc: async () => (await import('./images')).SCT_VC_IMAGES,
  sct_bd: async () => (await import('./images')).SCT_BD_IMAGES,
  vts_bd: async () => (await import('./images')).VTS_BD_IMAGES,
  vts_vc: async () => (await import('./images')).VTS_VC_IMAGES,
  vts_tn: async () => (await import('./images')).VTS_TN_IMAGES,
}

export type ImagesKey = keyof typeof IMAGES_LOADERS
