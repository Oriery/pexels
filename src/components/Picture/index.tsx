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
}

class Picture extends Component<PictureProps, PictureState> {
  constructor(props: PictureProps) {
    super(props);
    this.state = {
      isLoaded: false,
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
    const { isLoaded } = this.state;
    const SIZES = [100, 300, 500, 720, 1080, 1600];

    return (
      <div className="w-full overflow-hidden">
        <div className={'blurred-bg' + (isLoaded ? ' loaded' : '')} style={{
          backgroundImage: !this.props.isMock ? `url(${image!.src.original}?auto=compress&cs=tinysrgb&w=20)` : undefined,
          minHeight: isLoaded ? undefined : (this.props.mockMinHeight !== undefined ? this.props.mockMinHeight : Math.round(150 + Math.random() * 250)),
        }}>
          {!this.props.isMock ? (
            <img className="w-full" 
            alt={image!.alt || undefined} 
            src={image!.src.original + '?auto=compress&cs=tinysrgb&w=500'}
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
