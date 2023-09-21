import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Card,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Link,
  URLSearchParamsInit,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BooksResponse } from "../interfaces/books";
import { GoogleBooksService } from "../services/providers/GoogleBooksProvider";
import {
  SearchOptions,
} from "../interfaces/BooksProvider";

const Catalogue: React.FC = () => {
  const [booksData, setBooksData] = useState<BooksResponse>({
    kind: "",
    totalItems: 0,
    items: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const paramsObject = Object.fromEntries(params.entries())
  const query = params.get("query") || "";
  const [filters, setFilters] = useState<Partial<SearchOptions>>(paramsObject as unknown as SearchOptions);
  const pageNumber = Number(params.get("pageNumber")) || 1;

  const fetchBooks = async () => {
    setIsLoading(true);
    let data = null;
    if (filters.query)
      data = await GoogleBooksService.searchBooks(filters as SearchOptions);
    if (data) {
      setBooksData(data);
    }
    setIsLoading(false);
  };

  const handleSearch = (filters: SearchOptions) => {
    setFilters(filters);
    const queryParams: URLSearchParamsInit = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        queryParams[key] = value.toString();
      }
    }
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queryParams).toString(),
    });
  };

  useEffect(() => {
    if (query) fetchBooks();
  }, [location.search]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => handleSearch({ ...filters, pageNumber } as SearchOptions);

  const renderBookList = () => {
    const { items } = booksData;
    return (
      <Card
        variant="outlined"
        sx={{
          width: "60%",
          margin: "2rem auto",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        {query && (
          <Typography variant="h6">Search results for "{query}"</Typography>
        )}
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {items.length
              ? items.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}/details`}
                    // selfLink can be used to fetch records on details Page if needed.
                    state={{ query: location.search, selfLink: book.selfLink }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={book.volumeInfo.imageLinks?.thumbnail} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={book.volumeInfo.title}
                        secondary={`Authors : ${
                          book.volumeInfo.authors
                            ? book.volumeInfo.authors.join(", ")
                            : ""
                        } |
                  Date : ${
                    new Date(book.volumeInfo.publishedDate).getFullYear() ||
                    "N/A"
                  } | Rating: ${book.volumeInfo.averageRating || "N/A"}`}
                      />
                    </ListItem>
                  </Link>
                ))
              : "Search books by typing in search bar"}
          </List>
        )}
        {items.length ? (
          <Pagination
            count={Math.ceil(booksData.totalItems / 5)}
            page={pageNumber}
            onChange={handlePageChange}
            style={{ marginTop: "1rem" }}
          />
        ) : null}
      </Card>
    );
  };

  return (
    <>
      <Search onSearch={handleSearch} defaultValues={filters}/>
      {renderBookList()}
    </>
  );
};

export default Catalogue;
