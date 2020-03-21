import React from 'react'

class Book extends React.Component {
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.url }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.props.onShelf(this.props.book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" selected={this.props.book.shelf === "currentlyReading" && ('selected')}>Currently Reading</option>
                                <option value="wantToRead" selected={this.props.book.shelf === "wantToRead" && ('selected')}>Want to Read</option>
                                <option value="read" selected={this.props.book.shelf === "read" && ("selected")}>Read</option>
                                <option value="none" selected={!this.props.book.shelf && ("selected")}>None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.name}</div>
                    <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )
    }
}

export default Book