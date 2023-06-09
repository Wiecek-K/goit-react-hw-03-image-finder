import { Component } from "react";
import axios from "axios";

import { PhotoI } from "../types/Photo.ts";
import ImageGalleryItem from "./ImageGalleryItem";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

// const ArticleList = ({ articles }) => (
//   <ul>
//     {articles.map(({ objectID, url, title }) => (
//       <li key={objectID}>
//         <a href={url} target="_blank" rel="noreferrer noopener">
//           {title}
//         </a>
//       </li>
//     ))}
//   </ul>
// );
interface ImageGalleryProps {
  photos: PhotoI[];
}

class ImageGallery extends Component<ImageGalleryProps> {
  constructor(props: ImageGalleryProps) {
    super(props);
  }

  render() {
    //  { id, webformatURL, largeImageURL, tags }
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

        {/* {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
          <li key={id}>
            <ImageGalleryItem
              id={id}
              src={webformatURL}
              alt={tags}
              largePhoto={largeImageURL}
            />
          </li>;
        })} */}
      </ul>
    );
  }
}
export default ImageGallery;
