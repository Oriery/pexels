type PexelImage = {
  id: number,
  width: number,
  height: number,
  url: string,
  photographer: string,
  photographer_url: string,
  photographer_id: number,
  avg_color: string,
  src: {
    original: string,
    large2x: string,
    large: string,
    medium: string,
    small: string,
    portrait: string,
    landscape: string,
    tiny: string
  },
  liked: boolean,
  alt: string
}

function Picture({ image } : { image: PexelImage }) {
  return (
    <div className="w-[100px] max-h-[100px]">
      <img src={image.src.small} alt={image.alt} />
    </div>
  )
}

export default Picture
