import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import { update, search } from './BooksAPI'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    localBooks: [
      {
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        url: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
        shelf: "currentlyReading",
        id: 1
      },
      {
        name: "Ender's Game",
        author: 'Orson Scott Card',
        url: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
        shelf: "currentlyReading",
        id: 2
      },
      {
        name: '1776',
        author: 'David McCullough',
        url: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
        shelf: "wantToRead",
        id: 3
      },
      {
        name: "Harry Potter and the Sorcerer's Stone",
        author: 'J.K. Rowling',
        url: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
        shelf: "wantToRead",
        id: 4
      },
      {
        name: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        url: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
        shelf: "read",
        id: 5
      },
      {
        name: "Oh, the Places You'll Go!",
        author: 'Seuss',
        url: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
        shelf: "read",
        id: 6
      },
      {
        name: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain',
        url: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
        shelf: "read",
        id: 7
      }
    ],
    books: [],
    searchBooks: [],
    query: ''
  }

  componentDidMount() {
    if (!window.localStorage) {
      alert("Browser doesn't support Localstorage");
      this.setState((prevState) => ({
        books: prevState.books.concat(prevState.localBooks)
      }));
      return;
    } else {
      let storage = window.localStorage;
      let localB = [];
      for (let i = 0; i < storage.length; i++) {
        if (storage.key(i) !== "token") {
          localB.push(JSON.parse(storage.getItem(storage.key(i))));
        }
        // localB.push(JSON.parse(storage.getItem(i+1)));
        // console.log(storage.getItem(storage.key(i)));
      }
      this.setState((prevState) => ({
        books: prevState.books.concat(localB)
      }));
    }

  }

  handleShelf = (b, s) => {
    // console.log(name + ', ' + s);
    if (!b.shelf) {  // the book doesn't exist yet
      let newbook = {
        name: b.title,
        author: b.authors,
        id: b.id,
        shelf: s,
        url: 'url("' + b.imageLinks.thumbnail + ')"'
      };
      this.setState((prevState) => ({
        books: prevState.books.concat([newbook])
      }));
      window.localStorage.setItem(b.id, JSON.stringify(newbook));
    } else {  // the book exist on main page
      this.setState((prevState) => ({
        books: prevState.books.map((book) => {
          if (book.id === b.id) {
            book.shelf = s;
            window.localStorage.setItem(b.id, JSON.stringify(book));
          }
          return book;
        })
      }));
    }
  }

  handleQuery(q) {
    // console.log(q);
    search(q).then((books) => {
      console.log(books);
      this.setState({ searchBooks: books });
    });
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/search' render={() => {
          return (<div className="search-books">
            <div className="search-books-bar">
                <Link to='/'>
                <button className="close-search">Close</button></Link>
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleQuery(e.target.value)} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {Array.isArray(this.state.searchBooks) && this.state.searchBooks.length !== 0 && this.state.searchBooks.map((book) => (
                  <Book key={book.id} url={'url("' + book.imageLinks.thumbnail + ')"'} onShelf={this.handleShelf} book={book} name={book.title} author={book.authors} />
                ))}
              </ol>
            </div>
          </div>)
        }} />

        <Route exact path='/' render={() => {
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((book) => book.shelf === "currentlyReading").map((book, index) => (
                          <Book key={index} book={book} onShelf={this.handleShelf} url={book.url} name={book.name} author={book.author} />
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((book) => book.shelf === "wantToRead").map((book, index) => (
                          <Book key={index} book={book} onShelf={this.handleShelf} url={book.url} name={book.name} author={book.author} />
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((book) => book.shelf === "read").map((book, index) => (
                          <Book key={index} book={book} onShelf={this.handleShelf} url={book.url} name={book.name} author={book.author} />
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link className="open-search" to='/search'>
                  <button>
                    Add a book
                </button>
                </Link>
              </div>
            </div>)
        }} />
      </div>
    )
  }
}

export default BooksApp
