import { useState, type ImgHTMLAttributes } from 'react'
import { site } from '../../content/site'

type ImageWithLoaderProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  /** Already-loaded image shown blurred behind the spinner, e.g. the previous slide in a gallery. */
  previewSrc?: string
}

/** Real `<img>` that shows the brand's secondary icon as a spinner until it loads, optionally over a blurred preview. */
export default function ImageWithLoader({ className, previewSrc, onLoad, onError, ...imgProps }: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-tan/40">
          {previewSrc && (
            <img
              src={previewSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-50 blur-md"
            />
          )}
          <img
            src={site.logos.secondaryIcon}
            alt=""
            aria-hidden="true"
            className="relative h-8 w-8 animate-spin opacity-60"
            style={{ animationDuration: '1.1s' }}
          />
        </div>
      )}
      <img
        {...imgProps}
        onLoad={(event) => {
          setIsLoaded(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          setIsLoaded(true)
          onError?.(event)
        }}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
      />
    </div>
  )
}
