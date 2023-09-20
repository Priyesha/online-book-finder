import { IBooksProvider } from "../../interfaces/BooksProvider";
import { BookDetails, BooksResponse } from "../../interfaces/books";
import BooksService from "../BooksService";

class GoogleBooksProvider implements IBooksProvider {
    private baseURL: string = 'https://www.googleapis.com/books/v1/volumes';

    async searchBooks(query: string, pageNumber: number, recordsPerPage: number = 10): Promise<BooksResponse | null> {
        const startIndex = (pageNumber - 1) * recordsPerPage;
        const maxResults = recordsPerPage;

        try {
            const response = await fetch(`${this.baseURL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data ? data as BooksResponse : null;
        } catch (error: any) {
            console.error("There was a problem with the fetch operation:", error.message);
            throw error;
        }
    }

    async getBookDetails(bookId: string): Promise<BookDetails> {
        try {
            const response = await fetch(`${this.baseURL}/${bookId}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("There was a problem with the fetch operation:", error.message);
            throw error;
        }
    }
}

export const GoogleBooksService = new BooksService(new GoogleBooksProvider());