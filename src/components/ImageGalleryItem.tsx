import { Component } from "react";
import Modal from "./Modal";

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

interface ImageGalleryItemProps {
  src: string;
  alt: string;
  largePhoto: string;
}
interface State {
  showModal: boolean;
}
class ImageGalleryItem extends Component<ImageGalleryItemProps, State> {
  constructor(props: ImageGalleryItemProps) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    console.log("zamknij");
    this.setState({ showModal: false });
  };
  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.openModal}>
        <img
          className="ImageGalleryItem-image"
          src={this.props.src}
          alt={this.props.alt}
        />
        {this.state.showModal ? (
          <Modal
            src={this.props.largePhoto}
            alt={this.props.alt}
            closeModal={this.closeModal}
          />
        ) : null}
      </li>
    );
  }
}

export default ImageGalleryItem;
