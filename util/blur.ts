export function createBlurDataURL(color = "#e5e7eb") {
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>`
  )}`
}
