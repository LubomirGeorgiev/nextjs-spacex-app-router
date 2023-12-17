'use client'

import { Link as NextUiLink, type LinkProps } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const Link = (props: LinkProps) => {
  const router = useRouter()

  return (
    <NextUiLink
      {...props}
      as='div'
      href={undefined}
      onPress={() => {
        if (props?.href) {
          router.push(props.href)
        }
      }}
    />
  )
}

export default Link
