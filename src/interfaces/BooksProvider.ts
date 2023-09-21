export interface SearchOptions {
    query: string;
    author?: string;
    title?: string;
    publisher?: string;
    subject?: string;
    isbn?: string;
    lccn?: string;
    oclc?: string;
    pageNumber: number;
    recordsPerPage: number;
  }

export interface IBooksProvider {
    searchBooks(options: SearchOptions): Promise<any>;
    getBookDetails(bookId: string): Promise<any>;
}
