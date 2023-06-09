import Picture from "../Picture";
import { Photo } from 'pexels';

function PicturesList({images} : {
    images: Photo[]
  }) {
  const imagesElems = images.map((image) => {
    return (
      <Picture image={image} key={image.id} />
    )
  })

  return (
    <div className="m-6">
      <div className="flex flex-row h-10 w-full justify-between">
        <h1 className="text-2xl h-full flex items-center">Бесплатные стоковые фото</h1>
        <p className="whitespace-nowrap h-full flex items-center text-xs">All photos are provided by&nbsp;
          <a href="https://www.pexels.com" className="text-[#07a081]">
            Pexels
          </a>
        </p>
      </div>
      <div className="flex flex-row flex-wrap mt-6">
        {imagesElems}
      </div>
    </div>
  );
}

export default PicturesList;
