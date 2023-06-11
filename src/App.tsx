import { Component } from "react";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import type { PhotoI } from "./types/Photo.ts";
import { fetchPhotosWithQuery } from "./services/api";
import Loader from "./components/Loader.tsx";
import Searchbar from "./components/Searchbar.tsx";

interface State {
  page: number;
  query: string;
  isloading: boolean;
  photos: PhotoI[];
  isEnd: boolean;
}
export default class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      page: 1,
      query: "red flag sky",
      isloading: false,
      photos: [],
      isEnd: false,
    };
  }
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  resetPhotosData = () => {
    this.setState({ photos: [], page: 1, isEnd: true });
  };
  handleSubmit = (query: string) => {
    this.resetPhotosData();
    console.log("submit");
    this.setState({ query });
    this.getPhotos(query, 1);
  };

  getPhotos = async (query: string, page?: number) => {
    this.setState({ isloading: true });
    try {
      const data = await fetchPhotosWithQuery(query, page);
      this.setState((prevState) => ({
        photos: [...prevState.photos, ...data.hits],
      }));
      console.log(data);
      console.log(data.totalHits);
      if (data.total > this.state.page * 12) {
        console.log("koniec");
        this.setState({ isEnd: false });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isloading: false });
    }
  };
  componentDidMount() {
    this.getPhotos(this.state.query, this.state.page);
  }
  componentDidUpdate(prevProps: object, prevState: State) {
    if (prevState.page !== this.state.page) {
      this.getPhotos(this.state.query, this.state.page);
    }
  }

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <div className="App">
          <ImageGallery photos={this.state.photos} />
          {this.state.isloading ? <Loader /> : null}
          {!this.state.isEnd ? (
            <Button onClick={this.loadMore} title="Load More" />
          ) : null}
        </div>
      </>
    );
  }
}
