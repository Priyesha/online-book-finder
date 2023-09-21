import { SearchOptions } from '../../interfaces/BooksProvider';
import { GoogleBooksProvider } from '../providers/GoogleBooksProvider';

describe('GoogleBooksProvider', () => {
  let provider: GoogleBooksProvider;
  const mockFetch = jest.fn();

  beforeEach(() => {
    provider = new GoogleBooksProvider();
    global.fetch = mockFetch as any;
    mockFetch.mockClear();
  });

  test('should call fetch with expected query string', async () => {
    const options: SearchOptions = {
      query: 'harry potter',
      author: 'J.K. Rowling',
      title: 'Goblet of Fire',
      publisher: 'Bloomsbury',
      subject: 'Fantasy',
      isbn: '1234567890',
      lccn: 'lccnTest',
      oclc: 'oclcTest',
      pageNumber: 2,
      recordsPerPage: 5,
    };

    const expectedURL = 'https://www.googleapis.com/books/v1/volumes?q=harry%20potter+inauthor:J.K.%20Rowling+intitle:Goblet%20of%20Fire+inpublisher:Bloomsbury+subject:Fantasy+isbn:1234567890+lccn:lccnTest+oclc:oclcTest&startIndex=5&maxResults=5';

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    await provider.searchBooks(options);
    expect(mockFetch).toHaveBeenCalledWith(expectedURL);
  });

  test('should call fetch with expected bookId for getBookDetails', async () => {
    const bookId = 'testBookId';
    const expectedURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    await provider.getBookDetails(bookId);
    expect(mockFetch).toHaveBeenCalledWith(expectedURL);
  });
});
