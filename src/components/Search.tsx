import {
  Card, TextField, Button, InputAdornment, Collapse, Box, Grid, Alert, useMediaQuery, useTheme, IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, ChangeEvent } from "react";
import { SearchOptions } from "../interfaces/BooksProvider";

interface SearchProps {
  onSearch: (filters: SearchOptions) => void;
  placeholder?: string;
  defaultValues?: Partial<SearchOptions>;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Search for books...",
  defaultValues = {}
}) => {
  const theme = useTheme();  
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [query, setQuery] = useState<string>(defaultValues.query || "");
  const [author, setAuthor] = useState<string>(defaultValues.author || "");
  const [title, setTitle] = useState<string>(defaultValues.title || "");
  const [publisher, setPublisher] = useState<string>(defaultValues.publisher || "");
  const [subject, setSubject] = useState<string>(defaultValues.subject || "");
  const [isbn, setIsbn] = useState<string>(defaultValues.isbn || "");
  const [lccn, setLccn] = useState<string>(defaultValues.lccn || "");
  const [oclc, setOclc] = useState<string>(defaultValues.oclc || "");

  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = () => {
    const filters = {
      query,
      author,
      title,
      publisher,
      subject,
      isbn,
      lccn,
      oclc,
      pageNumber: 1,
      recordsPerPage: 5
    };
    onSearch(filters);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmit() 

  return (
    <Card
      variant="elevation"
      style={{
        width: "60%",
        margin: "1rem auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isMobileScreen ? <IconButton aria-label='search-button' data-testid='search-button' onClick={handleSubmit}>
                <SearchIcon />
              </IconButton> : <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                size="large"
                sx={isMobileScreen ? {padding: '0.5rem 0'} : {}}
                data-testid='search-button'
                startIcon={<SearchIcon />}
              >
                Search
              </Button>}
            </InputAdornment>
          ),
          onKeyDown: handleEnterPress
        }}
      />
      <Button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        style={{ margin: "0.5rem 0", alignSelf: "center" }}
      >
        {showAdvancedFilters ? "Hide Advanced Filters" : "Advanced Filters"}
      </Button>
      <Collapse in={showAdvancedFilters}>
        <Alert severity="info" sx={{margin: '1rem 0'}}>Type in respective field to refine your search</Alert>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField label="Author" variant="outlined" fullWidth defaultValue={author} onChange={(e) => setAuthor(e.target.value)} onKeyDown={handleEnterPress} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Title" variant="outlined" fullWidth defaultValue={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleEnterPress} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Publisher" variant="outlined" fullWidth defaultValue={publisher} onChange={(e) => setPublisher(e.target.value)} onKeyDown={handleEnterPress}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Subject" variant="outlined" fullWidth defaultValue={subject} onChange={(e) => setSubject(e.target.value)} onKeyDown={handleEnterPress} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="ISBN" variant="outlined" fullWidth defaultValue={isbn} onChange={(e) => setIsbn(e.target.value)} onKeyDown={handleEnterPress}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="LCCN" variant="outlined" fullWidth defaultValue={lccn} onChange={(e) => setLccn(e.target.value)} onKeyDown={handleEnterPress}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="OCLC" variant="outlined" fullWidth defaultValue={oclc} onChange={(e) => setOclc(e.target.value)} onKeyDown={handleEnterPress}/>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
};

export default Search;
