'use client';

import { useRouter } from 'next/navigation'


import { Pagination as NextUIPagination,  type PaginationProps } from '@nextui-org/react'

export default function Pagination(paginationProps: PaginationProps) {
  const router = useRouter()

  return (
      <NextUIPagination
        {...paginationProps}
        size='lg'
        onChange={(page) => {
          router.push(`/?page=${page}`)
        }}
      />
  )
}
