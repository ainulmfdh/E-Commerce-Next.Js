"use client"

import React from 'react'
import CardProduct from '../../_components/card-product'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../lib/data'
import { useFilter } from '@/hooks/useFilter'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function ProductListing() {
  const { filter } = useFilter()


  const { data, isLoading } = useQuery({
    queryKey: ['product-listing', filter],
    queryFn: () => fetchProduct(filter)
  })


  if (isLoading) {
    return (
      <div className='flex item-center justify-center'>
        <Box>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data?.map((product) => (
        <CardProduct key={product.id + product.name} item={product} />
      ))}
    </div>
  )
}
