import React from 'react';
import { Plus, Skull, Flame, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={() => onOpenModal(product)}
      className="group relative bg-white dark:bg-[#11121c] rounded-2xl border border-slate-200 dark:border-red-950/60 hover:border-red-500/70 overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl dark:hover:shadow-red-950/50 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11121c] via-transparent to-black/40" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHalloweenSpecial && (
            <span className="inline-flex items-center gap-1 bg-red-600/90 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-sm border border-red-400/40">
              <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
              MALDITO
            </span>
          )}
          {product.originalPrice && (
            <span className="inline-flex items-center gap-1 bg-amber-500/90 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              OFERTA SANGRIENTA
            </span>
          )}
        </div>

        {/* Quick View Button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-red-500/40 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-red-400" />
            Inspeccionar Manjar
          </span>
        </div>

        {/* Spice / Terror Meter */}
        {product.spiceLevel && (
          <div className="absolute bottom-3 right-3 flex items-center gap-0.5 bg-black/70 px-2 py-0.5 rounded-full border border-red-900/40">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skull 
                key={i} 
                className={`w-3 h-3 ${i < (product.spiceLevel || 0) ? 'text-red-500 fill-red-500' : 'text-slate-600'}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-red-400/90 text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Sparkles className="w-3 h-3" />
              <span className="font-bold">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Spooky Warning Snippet */}
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic">
            "{product.spookyWarning}"
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                S/. {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  S/. {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Stock: {product.stock} disponibles
            </span>
          </div>

          <button
            onClick={handleAdd}
            title="Agregar al caldero"
            className="p-3 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-md shadow-red-950 transition transform hover:scale-110 active:scale-95 border border-red-400/30 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
