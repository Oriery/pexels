import { Photo } from 'pexels';

function Picture({ image } : { image: Photo }) {
  return (
    <div className="w-[100px] max-h-[100px]">
      <img src={image.src.small} alt={image.alt || undefined} />
    </div>
  )
}

export default Picture
