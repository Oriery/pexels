import React, { Component } from 'react';
import { Photo } from 'pexels';
import './Picture.css';

interface PictureProps {
  image?: Photo;
  numberOfColumns?: number;
  isMock?: boolean;
  mockMinHeight?: number;
}

interface PictureState {
  isLoaded: boolean;
  isSmallImgLoaded: boolean;
}

class Picture extends Component<PictureProps, PictureState> {
  constructor(props: PictureProps) {
    super(props);



    this.state = {
      isLoaded: false,
      isSmallImgLoaded: false
    };
  
    if (!!props.image && !!props.isMock) {
      throw new Error('Picture component must receive either image or isMock prop');
    }
    if (!props.isMock && !props.numberOfColumns) {
      throw new Error('Picture component must receive numberOfColumns prop if image is not mock');
    }
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
            <img className="w-full" 
            alt={image!.alt || undefined} 
            src={image!.src.large}
            srcSet={SIZES.reduce((acc, px) => acc + `${image!.src.original}?auto=compress&cs=tinysrgb&w=${px} ${px}w, `, '').slice(0, -2)}
            loading="lazy"
            onLoad={this.handleImageLoad}
            sizes={`${SIZES.reduce((acc, px) => acc + `(max-width: ${px * numberOfColumns!}px) ${px}px, `, '')} 1600px`}
            />
          ) : undefined }
        </div>
      </div>
    );
  }
}

export default Picture;
