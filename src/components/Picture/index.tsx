import React, { Component } from 'react';
import { Photo } from 'pexels';
import './Picture.css';
import heart from './heart.png'
import bookmark from "./bookmark.png";
import download from "./download.png";
import loading from "./loading.svg";

interface PictureProps {
  image?: Photo;
  numberOfColumns?: number;
  isMock?: boolean;
  mockMinHeight?: number;
}

interface PictureState {
  isLoaded: boolean;
  isSmallImgLoaded: boolean;
  isDownloading: boolean;
}

class Picture extends Component<PictureProps, PictureState> {
  constructor(props: PictureProps) {
    super(props);

    this.state = {
      isLoaded: false,
      isSmallImgLoaded: false,
      isDownloading: false
    };
  
    if (!!props.image && !!props.isMock) {
      throw new Error('Picture component must receive either image or isMock prop');
    }
    if (!props.isMock && !props.numberOfColumns) {
      throw new Error('Picture component must receive numberOfColumns prop if image is not mock');
    }
  }

  downloadImage = (url : string) => {
    let filename = url.split('/').pop();

    this.setState({isDownloading: true});
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename!;
            link.click();
        })
        .catch(console.error)
        .finally(() => this.setState({isDownloading: false}));
  }


  handleImageLoad = () => {
    this.setState({ isLoaded: true });
  }

  render() {
    const { image, numberOfColumns } = this.props;
    const { isLoaded, isSmallImgLoaded } = this.state;
    const SIZES = [50, 120, 240, 300, 500, 720, 1080];

    return (
      <div className="w-full overflow-hidden">
        <link rel="preload" href={image ? `${image.src.original}?auto=compress&cs=tinysrgb&w=20` : undefined} as="image" onLoad={() => this.setState({isSmallImgLoaded: true})} />
        <div className={'blurred-bg' + (isLoaded ? ' loaded' : '')} style={{
          backgroundImage: !this.props.isMock ? `url(${image!.src.original}?auto=compress&cs=tinysrgb&w=20)` : undefined,
          minHeight: isLoaded || isSmallImgLoaded ? undefined : (this.props.mockMinHeight !== undefined ? this.props.mockMinHeight : Math.round(150 + Math.random() * 250)),
          height: isLoaded ? undefined : 0,
          paddingBottom: isLoaded ? undefined : (image ? `${image.height / image.width * 100}%` : undefined)
        }}>
          {!this.props.isMock ? (
            <div className='relative'>
              <img className="w-full" 
              alt={image!.alt || undefined} 
              src={image!.src.large}
              srcSet={SIZES.reduce((acc, px) => acc + `${image!.src.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
              loading="lazy"
              onLoad={this.handleImageLoad}
              sizes={`${SIZES.reduce((acc, px) => acc + `(max-width: ${px * numberOfColumns!}px) ${px}px, `, '')} 1600px`}
              />
              <div className='absolute top-0 left-0 h-full w-full flex flex-col justify-between p-2 opacity-0 hover:opacity-100'
                style={{
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%)'
                }}
              >
                <div className='flex flex-row w-full space-x-1 justify-end'>
                  <div className='bg-white rounded-lg p-3 w-10 h-10 flex items-center'>
                    <img src={bookmark} alt="bookmark" className='' />
                  </div>
                  <div className='bg-white rounded-lg p-3 w-10 h-10 flex items-center'>
                    <img src={heart} alt="like" className='' />
                  </div>
                </div>
                <div className='flex flex-row w-full space-x-1 justify-between'>
                  <div className='flex items-center px-2'>
                    <a className='text-md text-white font-semibold' href={image!.photographer_url} target='_blank' rel="noreferrer">{image!.photographer}</a>
                  </div>
                  <div className='bg-white rounded-lg p-3 w-10 h-10 flex items-center' onClick={() => this.downloadImage(image!.src.original)}>
                    { this.state.isDownloading ?
                      <img src={loading} alt="loading" className='' />
                      :
                      <img src={download} alt="download" className='' />
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : undefined }
        </div>
      </div>
    );
  }
}

export default Picture;
