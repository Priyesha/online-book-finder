import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Card } from '@mui/material';
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import BooksService from '../services/BooksService';
import { BooksResponse } from '../interfaces/books'
import { GoogleBooksProvider } from '../services/providers/GoogleBooksProvider';

const Catalogue: React.FC = () => {
  const [booksData, setBooksData] = useState<BooksResponse>({
    kind: '',
    totalItems: 0,
    items: []
  });
  const navigate = useNavigate();
  const location = useLocation();

  // We can provide any other API provider in future as well.
  const googleBooksService = new BooksService(new GoogleBooksProvider());

  const fetchBooks = async (query: string, pageNumber: number, recordsPerPage: number) => {
    const data = await googleBooksService.searchBooks(query, pageNumber, recordsPerPage);
    if(data) {
        setBooksData(data)
    }
  };

  const handleSearch = (query: string) => {
    navigate({
        pathname: location.pathname,
        search: createSearchParams({ query , pageNumber: '1', recordsPerPage: '5' }).toString()
    })
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const pageNumber = Number(params.get('pageNumber')) || 1;
    const recordsPerPage = Number(params.get('recordsPerPage')) || 5;
    if(query)
        fetchBooks(query, pageNumber, recordsPerPage);
  }, [location.search]);

  const renderBookList = () => {
    const { items } = booksData;
    return (
        <Card variant="outlined" style={{ width: '80%', margin: '2rem auto', padding: '1rem' }}>
        <List>
          {items.length ? items.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}/details`}
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
