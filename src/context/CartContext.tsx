import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CompletedOrder } from '../types';
import { soundFX } from '../utils/audioEffects';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: CompletedOrder | null;
  setCompletedOrder: (order: CompletedOrder | null) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyCoupon: (code: string) => boolean;
  couponApplied: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const CART_STORAGE_KEY = 'cheff_market_cart_v1';
const CART_SOUND_KEY = 'cheff_market_sound_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_SOUND_KEY);
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    soundFX.enabled = enabled;
    try {
      localStorage.setItem(CART_SOUND_KEY, JSON.stringify(enabled));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    soundFX.playKnifeSlice();
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    soundFX.playCauldronBubble();
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    soundFX.playKnifeSlice();
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponApplied(false);
    setCouponCode('');
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SQUADTI' || clean === 'HALLOWEEN666' || clean === 'CHEFFTERROR') {
      setCouponApplied(true);
      soundFX.playSpookyBell();
      return true;
    }
    return false;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.20 : 0; // 20% discount with secret coupon
  const shipping = items.length > 0 ? (subtotal > 80 ? 0 : 9.90) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        couponCode,
        setCouponCode,
        applyCoupon,
        couponApplied,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
