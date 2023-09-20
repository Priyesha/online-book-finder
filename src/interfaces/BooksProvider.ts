export interface IBooksProvider {
    searchBooks(query: string, pageNumber: number, recordsPerPage?: number): Promise<any>;
    getBookDetails(bookId: string): Promise<any>;
}
