import { CartBadge, ProductCard } from '@/components';
import { CartProvider } from '@/context';

import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Cart Flow', () => {
  it('should update badge after adding an item', () => {
    const testItem = {
      id: 1,
      name: 'Fairphone',
      image: 'image.jpp',
      price: 500.0,
    };

    render(
      <CartProvider>
        <ProductCard item={testItem} />

        <CartBadge />
      </CartProvider>,
    );

    const productBtn = screen.getByRole('button', { name: /add fairphone/i });
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 0 and you'll pay up to 0,00 €");

    fireEvent.click(productBtn);
    expect(badge).toHaveTextContent("Items in your cart: 1 and you'll pay up to 500,00 €");
  });
});
