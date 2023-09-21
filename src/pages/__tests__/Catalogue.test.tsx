/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalogue from "../Catalogue";
import { mockBookList } from "../mockData.catalogue";
import { GoogleBooksService } from "../../services/providers/GoogleBooksProvider";

const mockData = mockBookList;

jest.mock("../../services/providers/GoogleBooksProvider", () => {
  return {
    GoogleBooksService: {
      searchBooks: jest.fn(),
    },
  };
});
jest.mock("../../services/BooksService");

describe("<Catalogue />", () => {
  beforeEach(() => {
    (
      GoogleBooksService.searchBooks as jest.MockedFunction<any>
    ).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search component", () => {
    render(<Catalogue />, { wrapper: MemoryRouter });
    const searchElement = screen.getByPlaceholderText(/Search for books/i);
    expect(searchElement).toBeInTheDocument();
  });

  it("lists books when search button is clicked", async () => {
    render(<Catalogue />, { wrapper: MemoryRouter });

    const searchElement = screen.getByPlaceholderText(/Search for books/i);
    fireEvent.change(searchElement, { target: { value: "Rich Dad" } });

    const searchButton = screen.getByTestId('search-button');
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(
      screen.getByText(/Rich Dad's Cashflow Quadrant/)
    ).toBeInTheDocument();
  });

  it("renders loader correctly", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/?query=test"]}>
        <Catalogue />
      </MemoryRouter>
    );

    // Assert that loader is shown initially
    expect(getByRole("progressbar")).toBeInTheDocument();
  });
});
