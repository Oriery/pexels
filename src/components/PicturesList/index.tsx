import Picture from "../Picture";

function PicturesList({images} : {images: any[]}) {
  const imagesElems = images.map((image) => {
    return (
      <Picture image={image} key={image.id} />
    )
  })

  return (
    <div className="m-6">
      <h1 className="text-2xl">Бесплатные стоковые фото</h1>
      <div className="flex flex-row justify-between h-10 w-full">
        <p className="whitespace-nowrap h-full flex items-center text-xs">All photos are provided by</p>
        <a href="https://www.pexels.com" className="flex flex-row p-2 grow-0">
          <img src="https://images.pexels.com/lib/api/pexels.png" alt="Pexels.com logo"/>
        </a>
      </div>
      <div className="flex flex-row flex-wrap mt-6">
        {imagesElems}
      </div>
    </div>
  );
}

export default PicturesList;
