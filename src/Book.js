import React from 'react'
import PlaceChanger from './PlaceChanger'

class Book extends React.Component {
    state = {
        shelf: this.props.shelf
    }
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.url }}></div>
                        <PlaceChanger />
                    </div>
                    <div className="book-title">{this.props.name}</div>
                    <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )
    }
}

export default Book