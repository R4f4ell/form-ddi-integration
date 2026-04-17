declare module 'aos' {
  type AosOptions = {
    duration?: number
    delay?: number
    easing?: string
    once?: boolean
    offset?: number
    anchorPlacement?: string
  }

  const AOS: {
    init: (options?: AosOptions) => void
    refresh: () => void
    refreshHard: () => void
  }

  export default AOS
}
