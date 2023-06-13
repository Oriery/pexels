import { useEffect, useState } from "react";
import Picture from "../Picture";
import { Photo } from 'pexels';
import loadingIcon from './loading.svg';
import usePicturesManager from "../../managers/picturesManager";
import { debounce } from "advanced-throttle-debounce";
import Filters from "../Filters";

const minHeightsOfMocks = Array.from({ length: 11 }, () => Math.round(200 + Math.random() * 200));

function PicturesList({ images, picturesManager, onFiltersChanged, posY, isOnCategoryPage, searchQuery } : { 
    images: Photo[], 
    picturesManager : ReturnType<typeof usePicturesManager>, 
    onFiltersChanged? : (filters: string) => void, 
    posY: number, 
    isOnCategoryPage?: boolean,
    searchQuery?: string
  }) {
  const [columnsNumber, setColumnsNumber] = useState(window.innerWidth < 768 ? 2 : 3);

  const POS_Y_OF_ACTUAL_LIST_INSIDE_OF_COMPONENT = isOnCategoryPage ? 150 : 40;
  let listPosY = posY + POS_Y_OF_ACTUAL_LIST_INSIDE_OF_COMPONENT;

  useEffect(() => {

    let timeoutIsSet = false;
    let prevScrollYRaw = 0;
    let prevScrollY = 0;
    let prevScrollPercentage = 0;
    calcScrollVariables();

    function calcScrollVariables() {
      prevScrollYRaw = window.scrollY;
      prevScrollY = prevScrollYRaw - listPosY + window.innerHeight / 2;
      prevScrollPercentage = (prevScrollY) / (document.body.scrollHeight - listPosY);
    }

    function calculateNewScrollY(prevScrollPercentage : number) {
      return listPosY + prevScrollPercentage * (document.body.scrollHeight - listPosY) - window.innerHeight / 2;
    }

    const handleResize = debounce(() => {
      let changedNumberOfColumns = false;

      if (window.innerWidth < 768) {
        setColumnsNumber((prev) => {
          if (prev !== 2) {
            changedNumberOfColumns = true;
          }
          return 2;
        });
      } else {
        setColumnsNumber((prev) => {
          if (prev !== 3) {
            changedNumberOfColumns = true;
          }
          return 3;
        });
      }

      if (prevScrollYRaw > listPosY && !timeoutIsSet) {
        if (changedNumberOfColumns) {
          timeoutIsSet = true;

          let prevScrollPercentageCopy = prevScrollPercentage;
          let scroll = () => {
            window.scrollTo({
              left: 0,
              top: calculateNewScrollY(prevScrollPercentageCopy),
              behavior: 'smooth'
            });
            timeoutIsSet = false;
          }
          setTimeout(scroll, 1000);
        } else {
          window.scrollTo(0, calculateNewScrollY(prevScrollPercentage));
        }
      }

      calcScrollVariables();
    }, {wait: 30, maxWait: 200})

    const handleScroll = () => {
      calcScrollVariables();
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type ImageWithEl = { el: JSX.Element, picture: Photo | null };
  
  const imagesElems : ImageWithEl[] = images.length ? images.map((image, index) => {
    return {
      el: (
        <Picture image={image} seqNumber={index} key={image.id} numberOfColumns={columnsNumber} mockMinHeight={minHeightsOfMocks[index % minHeightsOfMocks.length]} />
      ), 
      picture: image
    };
  }) : Array.from({ length: window.innerHeight / 300 * columnsNumber }, (_, index) => {
    return {
      el: (
        <Picture key={-index} seqNumber={index} isMock={true} mockMinHeight={minHeightsOfMocks[index % minHeightsOfMocks.length]}/>
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
      <div className="flex flex-col md:flex-row min-h-10 w-full justify-between items-start md:items-center">
      { isOnCategoryPage && searchQuery ?
        <h1 className="text-[3rem] h-full flex items-center">Фото {searchQuery}</h1>
        :
        <h1 className="text-2xl h-full flex items-center">Бесплатные стоковые фото</h1>
      }
        <p className="whitespace-nowrap h-full flex items-center text-xs">All photos are provided by&nbsp;
          <a href="https://www.pexels.com" className="text-[#07a081] hover:brightness-75 duration-200" target="_blank" rel="noreferrer">
            <div tabIndex={100}>
              Pexels
            </div>
          </a>
        </p>
      </div>
      { isOnCategoryPage && (
        <div>
          <Filters onFiltersChanged={onFiltersChanged}/>
        </div>
      )}
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
