import Picture from "../Picture";
import { Photo } from 'pexels';

function PicturesList({images} : { images: Photo[] }) {
  const COLUMNS = 3;
  
  const imagesElems = images.map((image) => {
    return (
      <Picture image={image} key={image.id} numberOfColumns={COLUMNS} />
    )
  })

  const columnsOfImages = imagesElems.reduce((acc : JSX.Element[][], image, index) => {
    const column = index % COLUMNS;
    acc[column].push(image);
    return acc;
  }, Array.from({ length: COLUMNS }, () => []));

  const columnsOfImagesElems = columnsOfImages.map((column, index) => {
    return (
      <div className="flex flex-col gap-8" key={index}>
        {column}
      </div>
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
      <div className="grid grid-cols-3 gap-8">
        {columnsOfImagesElems}
      </div>
    </div>
  );
}

export default PicturesList;
