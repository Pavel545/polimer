export type GalleryImage = {
  src: string
  alt?: string
}

export type AboutItem = {
  icon: string
  title: string
  text: string
  gallery: GalleryImage[]
  href?: string
  onClick?: () => void
}