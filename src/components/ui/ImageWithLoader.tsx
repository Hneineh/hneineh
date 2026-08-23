import { useState, type ImgHTMLAttributes } from 'react'
import { site } from '../../content/site'

type ImageWithLoaderProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

/** Real `<img>` that shows the brand's secondary icon as a spinner until it loads. */
export default function ImageWithLoader({ className, ...imgProps }: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-tan/40">
          <img
            src={site.logos.secondaryIcon}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 animate-spin opacity-60"
            style={{ animationDuration: '1.1s' }}
          />
        </div>
      )}
      <img
        {...imgProps}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      />
    </div>
  )
}
