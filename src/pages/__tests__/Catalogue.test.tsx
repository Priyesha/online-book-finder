import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalogue from "../Catalogue";
import { mockBookList } from "../mockData.catalogue";

const mockData = mockBookList;

jest.mock("../../services/providers/GoogleBooksProvider", () => {
  // Mock class
  return jest.fn().mockImplementation(() => ({
    searchBooks: jest.fn().mockResolvedValue(mockData),
  }));
});
jest.mock("../../services/BooksService");

describe("<Catalogue />", () => {
  
  it("renders the search component", () => {
    render(<Catalogue />, { wrapper: MemoryRouter });
    const searchElement = screen.getByPlaceholderText(/Search for books/i);
    expect(searchElement).toBeInTheDocument();
  });

  it("lists books when search button is clicked", async () => {
    render(<Catalogue />, { wrapper: MemoryRouter });

    const searchElement = screen.getByPlaceholderText(/Search for books/i);
    fireEvent.change(searchElement, { target: { value: "Harry Potter" } });

    const searchButton = screen.getByText(/Search/i);
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(
      screen.getByText(/Rich Dad's Cashflow Quadrant/)
    ).toBeInTheDocument();
  });
});
