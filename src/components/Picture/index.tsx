import { Photo } from 'pexels';

function Picture({ image, numberOfColumns } : { image: Photo, numberOfColumns: number }) {
  const SIZES = [100, 300, 500, 720, 1080, 1600]

  return (
    <div className="w-full">
      <img className="w-full" 
        alt={image.alt || undefined} 
        src={image.src.original + '?auto=compress&cs=tinysrgb&w=500'}
        srcSet={SIZES.reduce((acc, px) => acc + `${image.src.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
        loading="lazy"
        sizes={`${SIZES.reduce((acc, px) => acc + `(max-width: ${px * numberOfColumns}px) ${px}px, `, '')} 1600px`}
        />
    </div>
  )
}

export default Picture
