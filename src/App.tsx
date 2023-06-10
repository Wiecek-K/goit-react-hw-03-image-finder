import { Component } from "react";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import type { PhotoI } from "./types/Photo.ts";
import { fetchPhotosWithQuery } from "./services/api";

interface State {
  page: number;
  query: string;
  loading: boolean;
  photos: PhotoI[];
}
export default class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      page: 1,
      query: "dog",
      loading: false,
      photos: [],
    };
  }
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    // handleSubmit = (ev) => {
    //   ev.preventDefault();
    //   this.getArticles(this.state.query);
    // };

    // handleChange = (ev) => {
    //   const { name, value } = ev.target;
    //   this.setState({ [name]: value });
    // };
  };
  // getArticles = async (query) => {
  //   this.setState({ loading: true });
  //   try {
  //     const articles = await api.fetchArticlesWithQuery(query);
  //     const title = `Wyniki dla zapytania: '${query}'`;
  //     this.setState({ articles, title });
  //   } catch (err) {
  //     this.setState({ error: err });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // };

  getPhotos = async (query: string, page?: number) => {
    this.setState({ loading: true });
    try {
      const data = await fetchPhotosWithQuery(query, page);
      this.setState((prevState) => ({
        photos: [...prevState.photos, ...data.hits],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
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
    // const { articles, loading, error, query, title } = this.state;
    // let content = null;
    // if (loading) {
    //   content = <p>Ładowanie artykułów...</p>;
    // } else {
    //   if (error !== null) {
    //     content = <p>Wystąpił błąd ({error})</p>;
    //   } else if (!articles.length) {
    //     content = <p>Brak artykułów</p>;
    //   } else {
    //     content = (
    //       <>
    //         <h1>{title}</h1>
    //         <ArticleList articles={articles} />
    //       </>
    //     );
    //   }
    // }
    return (
      // <Searchbar></Searchbar>
      <div className="App">
        <ImageGallery photos={this.state.photos} />
        <Button onClick={this.loadMore} title="Load More" />
      </div>
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <label htmlFor={inputId}>Słowo kluczowe</label>
      //     <br />
      //     <input
      //       type="text"
      //       name="query"
      //       value={query}
      //       id={inputId}
      //       onChange={this.handleChange}
      //     />
      //     <br />
      //     <button type="submit">Otrzymaj listę artykułów</button>
      //   </form>
      //   {content}

      //   {/* {articles.length && !loading ? <h1>{title}</h1> : null}
      //           {loading && <p>Ładowanie artykułów</p>}
      //           {error !== null && <p>Wystąpił błąd</p>}
      //           {!articles.length && !loading ? <p>Brak artykułów</p> : loading ? null : <ArticleList articles={articles} />}
      //           {articles.length && loading ? null : <ArticleList articles={articles} />} */}

      //   {/* {articles.length > 0 ? <ArticleList articles={articles} /> : <p>Brak artykułów</p>} */}

      //   {/* {loading ? (
      //               <p>Ładowanie artykułów...</p>
      //           ) : error !== null ? (
      //               <p>Wystąpił błąd: {error}</p>
      //           ) : articles.length > 0 ? (
      //               <ArticleList articles={articles} />
      //           ) : (
      //               <p>Brak artykułów</p>
      //           )} */}
      // </div>
    );
  }
}
