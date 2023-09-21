import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";
import { SearchOptions } from "../../interfaces/BooksProvider";

describe("Search component", () => {
  test("should display advanced filters on click of Advanced Filters button", () => {
    render(<Search onSearch={() => {}} />);

    const advancedFiltersButton = screen.getByText(/Advanced Filters/i);
    fireEvent.click(advancedFiltersButton);

    const authorInput = screen.getByLabelText("Author");
    expect(authorInput).toBeInTheDocument();
  });

  test("should have defaultValues filled in input fields if they are passed as props", () => {
    const defaultValues: Partial<SearchOptions> = {
      query: "Test Query",
      author: "Test Author",
      title: "Test Title",
      publisher: "Test Publisher",
      subject: "Test Subject",
      isbn: "Test ISBN",
      lccn: "Test LCCN",
      oclc: "Test OCLC",
    };

    render(<Search onSearch={() => {}} defaultValues={defaultValues} />);

    const queryInput = screen.getByPlaceholderText(
      "Search for books..."
    ) as HTMLInputElement;
    expect(queryInput.value).toBe(defaultValues.query);

    const advancedFiltersButton = screen.getByText(/Advanced Filters/i);
    fireEvent.click(advancedFiltersButton); // To show advanced filters

    const authorInput = screen.getByLabelText("Author") as HTMLInputElement;
    expect(authorInput.value).toBe(defaultValues.author);

    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    expect(titleInput.value).toBe(defaultValues.title);

    const publisherInput = screen.getByLabelText(
      "Publisher"
    ) as HTMLInputElement;
    expect(publisherInput.value).toBe(defaultValues.publisher);

    const subjectInput = screen.getByLabelText("Subject") as HTMLInputElement;
    expect(subjectInput.value).toBe(defaultValues.subject);
  });
});
