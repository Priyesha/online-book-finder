import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Catalogue from '../Catalogue';
import { mockBookList } from '../mockData.catalogue';
import BooksService from '../../services/BooksService';

jest.mock('../../services/BooksService'); // Mock the BooksService class

describe('<Catalogue />', () => {
  
  const mockData = mockBookList

  beforeEach(() => {
    (BooksService.searchBooks as jest.Mock).mockResolvedValue(mockData);
  });

  it('renders the search component', () => {
    render(<Catalogue />, { wrapper: MemoryRouter });
    const searchElement = screen.getByPlaceholderText(/Search for books/i); // assuming the Search component has this placeholder
    expect(searchElement).toBeInTheDocument();
  });


  it('lists books when search button is clicked', async () => {
    render(<Catalogue />, { wrapper: MemoryRouter });
    
    const searchElement = screen.getByPlaceholderText(/Search for books/i);
    fireEvent.change(searchElement, { target: { value: 'Harry Potter' } });

    const searchButton = screen.getByText(/Search/i);
    await act(async () => {
      fireEvent.click(searchButton);
    });
    
    expect(screen.getByText(/Rich Dad's Cashflow Quadrant/)).toBeInTheDocument();
  });

});
