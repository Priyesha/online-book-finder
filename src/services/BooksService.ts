import { IBooksProvider, SearchOptions } from "../interfaces/BooksProvider";
import { BookDetails, BooksResponse } from "../interfaces/books";

class BooksService {
  private provider: IBooksProvider;

  constructor(provider: IBooksProvider) {
      this.provider = provider;
  }

  async searchBooks(options: SearchOptions): Promise<BooksResponse | null> {
    return this.provider.searchBooks(options)
  }

  async getBookDetails(bookId: string): Promise<BookDetails | null> {
    return this.provider.getBookDetails(bookId)
  }
}

export default BooksService;
