import { Component } from "react";
import Modal from "./Modal";

interface ImageGalleryItemProps {
  src: string;
  alt: string;
  largePhoto: string;
}
interface State {
  isModalOpen: boolean;
}

class ImageGalleryItem extends Component<ImageGalleryItemProps, State> {
  constructor(props: ImageGalleryItemProps) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.openModal}
          className="ImageGalleryItem-image"
          src={this.props.src}
          alt={this.props.alt}
        />
        {this.state.isModalOpen ? (
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
