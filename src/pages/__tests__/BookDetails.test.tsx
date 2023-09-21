/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockBookDetails } from "../mockData.catalogue";
import { GoogleBooksService } from "../../services/providers/GoogleBooksProvider";
import BookDetails from "../BookDetails";

const mockData = mockBookDetails;

jest.mock("../../services/providers/GoogleBooksProvider", () => {
  return {
    GoogleBooksService: {
      getBookDetails: jest.fn(),
    },
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    bookId: '123',
  }),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: { searchQuery: 'sample-query' },
  }),
}));
jest.mock("../../services/BooksService");

describe("<BookDetails />", () => {
  beforeEach(() => {
    (
      GoogleBooksService.getBookDetails as jest.MockedFunction<any>
    ).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the details component", () => {
    render(<BookDetails />, { wrapper: MemoryRouter });
    const searchElement = screen.getByText(/Back to Search/i);
    expect(searchElement).toBeInTheDocument();
  });

  it("renders book details when they are found", async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <MemoryRouter initialEntries={['/books/123/details']}>
        <BookDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(GoogleBooksService.getBookDetails).toHaveBeenCalledWith('123');
    });

    const cardHeader = getByText(/Published/i);
    expect(cardHeader).toBeInTheDocument();
    const imageThumbnail = getByTestId('book-thumbnail');
    expect(imageThumbnail).toBeInTheDocument();
  });
});
