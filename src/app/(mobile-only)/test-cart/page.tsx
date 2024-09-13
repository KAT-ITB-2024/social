'use client';
import React, { useState, useEffect } from 'react';

// Define a type for merchandise
type Merchandise = {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

// Define a type for the cart item which includes quantity
type CartItem = Merchandise & { quantity: number };

// Dummy data for merchandises
const merchandises: Merchandise[] = [
  {
    id: 'm1',
    name: 'T-Shirt',
    price: 20000,
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    name: 'Hoodie',
    price: 50000,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    name: 'Gantungan',
    price: 20000,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'm4',
    name: 'Dompet',
    price: 90000,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MerchandisePage: React.FC = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Merchandise | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart items:', error);
      }
    }
  }, []);

  const addToCart = (item: Merchandise, quantity: number): void => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...item, quantity });
    }
    setCartItems([...cartItems]);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setShowQuantityModal(false); // Close the modal after adding to cart
  };

  const removeFromCart = (itemId: string): void => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddClick = (item: Merchandise) => {
    setSelectedItem(item);
    setShowQuantityModal(true);
  };

  const handleQuantityChange = (quantity: number): void => {
    setQuantities({ ...quantities, [selectedItem!.id]: quantity });
  };

  const toggleCart = (): void => setShowCart(!showCart);

  return (
    <div className="container mx-auto px-4 py-[100px]">
      <button
        onClick={toggleCart}
        className="mb-4 rounded-xl border-2 bg-blue-100 px-3 py-2"
      >
        {showCart ? 'Hide Cart' : 'View Cart'}
      </button>
      {showCart && (
        <div className="absolute right-5 top-20 z-10 w-80 rounded-lg bg-white p-5 shadow-lg">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="my-2 border-b p-2">
                <h4 className="font-bold">{item.name}</h4>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove from Cart
                </button>
              </div>
            ))
          )}

          <button
            onClick={toggleCart}
            className="mb-4 rounded-xl border-2 bg-blue-100 px-3 py-2"
          >
            {showCart ? 'Hide Cart' : 'View Cart'}
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {merchandises.map((item) => (
          <div key={item.id} className="rounded-lg border p-4 shadow">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price}</p>
            <button
              onClick={() => handleAddClick(item)}
              className="mt-2 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {showQuantityModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg">Select Quantity</h2>
            <input
              type="number"
              min="1"
              max={selectedItem.stock}
              value={quantities[selectedItem.id] ?? 1}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="w-full rounded border-2 p-1 text-center"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowQuantityModal(false)}
                className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  addToCart(selectedItem, quantities[selectedItem.id] ?? 1)
                }
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchandisePage;
