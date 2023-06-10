import { Component } from "react";
import axios from "axios";

import { PhotoI } from "../types/Photo.ts";
import ImageGalleryItem from "./ImageGalleryItem";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";


interface ImageGalleryProps {
  photos: PhotoI[];
}

class ImageGallery extends Component<ImageGalleryProps> {
  constructor(props: ImageGalleryProps) {
    super(props);
  }

  render() {
    const { photos } = this.props;
    return (
      <ul className="ImageGallery">
        {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largePhoto={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;
