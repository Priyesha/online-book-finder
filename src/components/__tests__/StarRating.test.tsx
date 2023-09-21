import { render, screen } from '@testing-library/react';
import StarRating from '../StarRating';

describe('<StarRating />', () => {

  it('renders 5 bordered stars for 0 rating', () => {
    render(<StarRating averageRating={0} ratingsCount={0} />);
    const borderedStars = screen.getAllByTestId('bordered-star');
    expect(borderedStars).toHaveLength(5);
  });

  it('renders full stars based on averageRating', () => {
    render(<StarRating averageRating={3} ratingsCount={100} />);
    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(3);
  });

  it('renders a half star when averageRating has a decimal value', () => {
    render(<StarRating averageRating={3.5} ratingsCount={100} />);
    const halfStars = screen.getAllByTestId('half-star');
    expect(halfStars).toHaveLength(1);
  });

  it('renders the correct ratingsCount', () => {
    render(<StarRating averageRating={4} ratingsCount={250} />);
    expect(screen.getByText('(250 ratings)')).toBeInTheDocument();
  });
});
