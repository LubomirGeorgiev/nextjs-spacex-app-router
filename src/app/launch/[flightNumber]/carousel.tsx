'use client'

import MultiCarousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'

const Carousel = ({ images }: {
  images: string[]
}) => {
  console.log('--images', images)

  return (
    Array.isArray(images) && images.length > 0 && (
      <MultiCarousel
      responsive={{
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }}
    >
      {images.map((image, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`image-${index}`}
          className='w-full h-auto'
          alt='Mission image'
          src={image}
        />
      ))}
    </MultiCarousel>
    )
  )
}

export default Carousel
