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
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey);
  }

  handleEscKey(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    }
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    console.log("zamknij");
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.openModal}>
        <img
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
