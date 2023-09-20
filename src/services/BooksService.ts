import { IBooksProvider } from "../interfaces/BooksProvider";
import { BookDetails, BooksResponse } from "../interfaces/books";

class BooksService {
  private provider: IBooksProvider;

  constructor(provider: IBooksProvider) {
      this.provider = provider;
  }

  async searchBooks(query: string, pageNumber: number, recordsPerPage: number = 10): Promise<BooksResponse | null> {
    return this.provider.searchBooks(query, pageNumber, recordsPerPage)
  }

  async getBookDetails(bookId: string): Promise<BookDetails | null> {
    return this.provider.getBookDetails(bookId)
  }
}

export default BooksService;
