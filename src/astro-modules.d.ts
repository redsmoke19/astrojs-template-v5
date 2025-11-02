declare module '*.astro' {
  import type { ComponentProps } from 'astro/types'

  const Component: (props: ComponentProps<any>) => any
  export default Component
}
