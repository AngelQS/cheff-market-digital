export type ProductCategory = 
  | 'all'
  | 'frutas'
  | 'verduras'
  | 'bebidas'
  | 'carniceria'
  | 'reposteria'
  | 'ofertas';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  spookyWarning: string;
  chefQuote: string;
  description: string;
  spiceLevel?: 1 | 2 | 3 | 4 | 5; // Level of terror/spiciness
  stock: number;
  isHalloweenSpecial?: boolean;
  isChefRecommendation?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SquadMember {
  id: string;
  name: string;
  role: string;
  squadTeam: string;
  terrorLevel: number; // e.g. 98%
  specialtyDish: string;
  weapon: string;
  quote: string;
  image: string;
  githubUser?: string;
  curseFactor: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  file: string;
  cover: string;
  album: string;
  vibes: string;
}

export interface FakePaymentData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  address: string;
  deliveryOption: 'tumba' | 'cripta' | 'express_demonio';
  notes?: string;
}

export interface CompletedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment: FakePaymentData;
}
