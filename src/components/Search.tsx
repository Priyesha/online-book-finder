import { Card, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, ChangeEvent } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Search for books...",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <Card
      variant="elevation"
      style={{
        width: "60%",
        margin: "1rem auto",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                size="large"
                data-testid='search-button'
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </InputAdornment>
          ),
          onKeyDown: (e) => {
            if(e.key === 'Enter')
              handleSubmit()
          }
        }}
      />
    </Card>
  );
};

export default Search;
