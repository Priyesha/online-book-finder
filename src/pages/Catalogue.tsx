import React, { useState } from 'react';
import Search from '../components/Search';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import BooksService from '../services/BooksService';
import { BooksResponse } from '../interfaces/books'
import { GoogleBooksProvider } from '../services/providers/GoogleBooksProvider';

const Catalogue: React.FC = () => {
  const [booksData, setBooksData] = useState<BooksResponse>({
    kind: '',
    totalItems: 0,
    items: []
  });

  // We can provide any other API provider in future as well.
  const googleBooksService = new BooksService(new GoogleBooksProvider());

  const handleSearch = async (query: string) => {
    const data = await googleBooksService.searchBooks(query, 1, 5);
    if(data) {
        setBooksData(data)
    }
  };

  const renderBookList = () => {
    const { items } = booksData;
    return (
        <Card variant="outlined" style={{ width: '80%', margin: '2rem auto', padding: '1rem' }}>
        <List>
          {items.length ? items.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}/details`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={book.volumeInfo.imageLinks?.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={book.volumeInfo.title}
                  secondary={`Authors : ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ''} | Date : ${new Date(
                    book.volumeInfo.publishedDate
                  ).getFullYear()} | Rating: ${book.volumeInfo.averageRating}`}
                />
              </ListItem>
            </Link>
          )) : 'No books found'}
        </List>
        </Card>
      );
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      {renderBookList()}
    </>
  );
};

export default Catalogue;
