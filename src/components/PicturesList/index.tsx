import { useEffect, useState } from "react";
import Picture from "../Picture";
import { Photo } from 'pexels';
import loadingIcon from './loading.svg';
import usePicturesManager from "../../managers/picturesManager";

const minHeightsOfMocks = Array.from({ length: 11 }, () => Math.round(200 + Math.random() * 200));

function PicturesList({ images, picturesManager } : { images: Photo[], picturesManager : ReturnType<typeof usePicturesManager> }) {
  const [columnsNumber, setColumnsNumber] = useState(window.innerWidth < 768 ? 2 : 3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnsNumber(2);
      } else {
        setColumnsNumber(3);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  type ImageWithEl = { el: JSX.Element, picture: Photo | null };
  
  const imagesElems : ImageWithEl[] = images.length ? images.map((image, index) => {
    return {
      el: (
        <Picture image={image} key={image.id} numberOfColumns={columnsNumber} mockMinHeight={minHeightsOfMocks[index % minHeightsOfMocks.length]} />
      ), 
      picture: image
    };
  }) : Array.from({ length: window.innerHeight / 300 }, (_, index) => {
    return {
      el: (
        <Picture key={-index} isMock={true} mockMinHeight={minHeightsOfMocks[index % minHeightsOfMocks.length]}/>
      ), 
      picture: null
    };
  });


  const columnsOfImages = imagesElems.reduce((acc : {images: JSX.Element[], colHeight: number}[], imageWithEl, index) => {
    // column with min height
    const column = acc.reduce((acc, column, index) => {
      return column.colHeight < acc.colHeight ? { index, colHeight: column.colHeight } : acc;
    }, { index: 0, colHeight: acc[0].colHeight }).index;

    // col height is rough but good enough approximation of the height of the column in weird units
    if (imageWithEl.picture) {
      acc[column].colHeight += imageWithEl.picture.height / imageWithEl.picture.width;
    } else {
      acc[column].colHeight += imageWithEl.el.props.mockMinHeight!;
    }

    acc[column].images.push(imageWithEl.el);
    return acc;
  }, Array.from({ length: columnsNumber }, () => ({ images: [], colHeight: 0 })));


  const columnsOfImagesElems = columnsOfImages.map((column, index) => {
    return (
      <div className="flex flex-col gap-4 md:gap-8" key={index}>
        {column.images}
      </div>
    )
  });

  return (
    <div className="PictureList mx-auto p-4 md:p-8 max-w-[1280px] 2xl:px-8 2xl:max-w-[1460px]">
      <div className="flex flex-col md:flex-row h-10 w-full justify-between">
        <h1 className="text-2xl h-full flex items-center">Бесплатные стоковые фото</h1>
        <p className="whitespace-nowrap h-full flex items-center text-xs">All photos are provided by&nbsp;
          <a href="https://www.pexels.com" className="text-[#07a081]" target="_blank" rel="noreferrer">
            Pexels
          </a>
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-4">
        {columnsOfImagesElems}
      </div>
      {picturesManager.isSearching && (
        <div className="flex flex-col items-center justify-center mt-8">
          <img src={loadingIcon} alt="loading" />
        </div>
        )}
    </div>
  );
}

export default PicturesList;
