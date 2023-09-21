import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Card, Pagination, Typography, CircularProgress } from '@mui/material';
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { BooksResponse } from '../interfaces/books'
import { GoogleBooksService } from '../services/providers/GoogleBooksProvider';

const Catalogue: React.FC = () => {
  const [booksData, setBooksData] = useState<BooksResponse>({
    kind: '',
    totalItems: 0,
    items: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  const pageNumber = Number(params.get('pageNumber')) || 1;
  const recordsPerPage = Number(params.get('recordsPerPage')) || 5;

  const fetchBooks = async (query: string, pageNumber: number, recordsPerPage: number) => {
    setIsLoading(true);
    const data = await GoogleBooksService.searchBooks(query, pageNumber, recordsPerPage);
    if(data) {
        setBooksData(data)
    }
    setIsLoading(false);
  };

  const handleSearch = (query: string, pageNumber: string = '1' ) => {
    navigate({
        pathname: location.pathname,
        search: createSearchParams({ query , pageNumber, recordsPerPage: '5' }).toString()
    })
  };

  useEffect(() => {
    if(query)
        fetchBooks(query, pageNumber, recordsPerPage);
  }, [location.search]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) =>
    handleSearch(query, pageNumber.toString())

  const renderBookList = () => {
    const { items } = booksData;
    return (
        <Card variant="outlined" sx={{ width: '60%', margin: '2rem auto', padding: '1rem', alignItems: 'center' }}>
        {query && <Typography variant="h6">Search results for "{query}"</Typography>}
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (<List>
          {items.length ? items.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}/details`}
              state={{searchQuery: query }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={book.volumeInfo.imageLinks?.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={book.volumeInfo.title}
                  secondary={`Authors : ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ''} |
                  Date : ${new Date(
                    book.volumeInfo.publishedDate
                  ).getFullYear() || 'N/A'} | Rating: ${book.volumeInfo.averageRating || 'N/A'}`}
                />
              </ListItem>
            </Link>
          )) : 'Search books by typing in search bar'}
        </List>)
        }
        {items.length ? 
        <Pagination 
          count={Math.ceil(booksData.totalItems / 5)} 
          page={pageNumber}
          onChange={handlePageChange}
          style={{ marginTop: '1rem' }}
        /> : null}
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
