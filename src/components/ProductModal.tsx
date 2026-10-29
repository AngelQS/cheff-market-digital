import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Skull, Flame, Sparkles, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-start sm:items-center justify-center bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f101b] rounded-3xl border border-slate-200 dark:border-red-900/60 shadow-2xl shadow-black/60 dark:shadow-red-950/80 overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div className="relative w-full md:w-1/2 h-56 md:h-auto bg-slate-950 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 md:hidden" />
          
          {product.isHalloweenSpecial && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-red-400/40">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                MANJAR DE HALLOWEEN
              </span>
            </div>
          )}
        </div>

        {/* Right Details Section */}
        <div className="p-5 sm:p-7 w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-widest font-bold text-red-600 dark:text-red-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            {/* Product Name */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-500 font-mono">
                S/. {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                  S/. {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Spooky Warning Box */}
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-red-950/40 border border-rose-200 dark:border-red-900/60 mb-3 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">
                  Advertencia Paranormal
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 italic">
                  {product.spookyWarning}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {product.description}
            </p>

            {/* Chef Quote */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-3">
              <p className="italic text-slate-700 dark:text-slate-300">
                {product.chefQuote}
              </p>
            </div>

            {/* Terror/Spice Level */}
            {product.spiceLevel && (
              <div className="flex items-center justify-between text-xs py-2 border-y border-slate-200 dark:border-slate-800 mb-4">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Nivel de Maldición:</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skull
                      key={i}
                      className={`w-3.5 h-3.5 ${i < (product.spiceLevel || 0) ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cantidad:</span>
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar al Caldero (S/. {(product.price * quantity).toFixed(2)})</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
