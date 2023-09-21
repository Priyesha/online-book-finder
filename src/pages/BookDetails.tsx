import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import StarRating from "../components/StarRating";
import { GoogleBooksService } from "../services/providers/GoogleBooksProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BookDetails } from "../interfaces/books";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface BookItemProps {}

const BookItem: React.FC<BookItemProps> = () => {
  const [showMore, setShowMore] = useState(false);
  const { bookId } = useParams<{ bookId: string }>();
  const [bookDetail, setBookDetail] = useState<BookDetails | null>(null);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    cardWidth: {
      width: '60%',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
    },
    media: {
      [theme.breakpoints.down('sm')]: {
        width: "100%",
        marginBottom: '1rem',
        alignItems: 'center'
      },
      width: "30%",
      maxHeight: "auto"
    },
    content: {
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      },
      width: "70%"
    }
  }

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        if (!bookId) return;
        const data = await GoogleBooksService.getBookDetails(bookId);
        setBookDetail(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  const {
    authors = [],
    description = "",
    title = "",
    publishedDate = "",
    categories = [],
    averageRating,
    ratingsCount,
  } = bookDetail?.volumeInfo || {};
  const thumbnail =
    bookDetail?.volumeInfo.imageLinks.thumbnail ||
    bookDetail?.volumeInfo.imageLinks.smallThumbnail ||
    "";
  const truncatedDescription = `${description
    .split(" ")
    .slice(0, 30)
    .join(" ")}...`;

  return (
    <Card
      variant="outlined"
      sx={{ ...styles.cardWidth, marginBottom: 16, margin: "1rem auto" }}
    >
      <Button
        onClick={() => navigate(`/?query=${location.state.searchQuery}`)}
        style={{ marginLeft: '1rem' }}
        startIcon={<ArrowBackIcon />}
      >
        Back to Search
      </Button>
      <CardHeader
        title={bookDetail?.volumeInfo?.title}
        subheader={<>
            {`by ${authors.join(", ")} | Published: ${publishedDate}`}
            {averageRating ? (
                <StarRating
                averageRating={averageRating as number}
                ratingsCount={ratingsCount as number}
                />
            ) : null}
        </>}
      >
        
      </CardHeader>
      
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} padding="1rem">
        <CardMedia
          component="img"
          alt={title}
          sx={styles.media}
          image={thumbnail}
          data-testid="book-thumbnail"
        />
        <CardContent sx={styles.content}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={"flex-start"}
            marginBottom={"1rem"}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              dangerouslySetInnerHTML={{
                __html: showMore ? description : truncatedDescription,
              }}
              style={{ flex: 1 }}
            />
            <Button size="small" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Show more"}
            </Button>
          </Box>
          {categories &&
            categories.map((category, index) => (
              <Chip data-testid='category-chip' key={index} label={category} style={{ margin: 2 }} />
            ))}
        </CardContent>
      </Box>
    </Card>
  );
};

export default BookItem;
