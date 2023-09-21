import { IBooksProvider, SearchOptions } from "../../interfaces/BooksProvider";
import { BookDetails, BooksResponse } from "../../interfaces/books";
import BooksService from "../BooksService";

class GoogleBooksProvider implements IBooksProvider {
  private baseURL: string = 'https://www.googleapis.com/books/v1/volumes';

  private constructQueryString(options: SearchOptions): string {
    let queryString = `q=${encodeURIComponent(options.query)}`;

    if (options.author) {
      queryString += `+inauthor:${encodeURIComponent(options.author)}`;
    }

    if (options.title) {
      queryString += `+intitle:${encodeURIComponent(options.title)}`;
    }

    if (options.publisher) {
      queryString += `+inpublisher:${encodeURIComponent(options.publisher)}`;
    }

    if (options.subject) {
      queryString += `+subject:${encodeURIComponent(options.subject)}`;
    }

    if (options.isbn) {
      queryString += `+isbn:${encodeURIComponent(options.isbn)}`;
    }

    if (options.lccn) {
      queryString += `+lccn:${encodeURIComponent(options.lccn)}`;
    }

    if (options.oclc) {
      queryString += `+oclc:${encodeURIComponent(options.oclc)}`;
    }

    return queryString;
  }

  async searchBooks(options: SearchOptions): Promise<BooksResponse | null> {
    const startIndex = (options.pageNumber ? options.pageNumber - 1 : 0) * (options.recordsPerPage || 10);
    const maxResults = options.recordsPerPage || 10;

    try {
      const response = await fetch(
        `${this.baseURL}?${this.constructQueryString(options)}&startIndex=${startIndex}&maxResults=${maxResults}`
      );

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