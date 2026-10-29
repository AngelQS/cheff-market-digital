import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Apple, Carrot, Wine, UtensilsCrossed, Cake, Tag, Flame } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'terror'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todos', icon: <Flame className="w-4 h-4 text-red-500" /> },
    { id: 'frutas', label: 'Frutas Malditas', icon: <Apple className="w-4 h-4 text-rose-400" /> },
    { id: 'verduras', label: 'Verduras & Cosechas', icon: <Carrot className="w-4 h-4 text-orange-400" /> },
    { id: 'bebidas', label: 'Pócimas & Elixires', icon: <Wine className="w-4 h-4 text-purple-400" /> },
    { id: 'carniceria', label: 'Carnicería Gourmet', icon: <UtensilsCrossed className="w-4 h-4 text-red-400" /> },
    { id: 'reposteria', label: 'Postres del Averno', icon: <Cake className="w-4 h-4 text-pink-400" /> },
    { id: 'ofertas', label: 'Ofertas Sangrientas', icon: <Tag className="w-4 h-4 text-amber-400" /> },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory === 'ofertas') {
        if (!item.originalPrice) return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'terror') return (b.spiceLevel || 0) - (a.spiceLevel || 0);
      // featured:
      return (b.isHalloweenSpecial ? 1 : 0) - (a.isHalloweenSpecial ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Despensa de la Tribu TI Digital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>Mercado Gastronómico Maldito</span>
            <span className="font-['Creepster'] text-red-600 dark:text-red-500 text-glow-red text-2xl hidden sm:inline">
              666
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
            Frutas frescas, verduras del huerto de brujas, pócimas con cafeína y cortes selectos elaborados por los 28 integrantes de nuestro squad.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pócima, fruta, carne..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-red-500 focus:outline-none text-white text-xs placeholder-slate-500 transition"
            />
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs focus:border-red-500 focus:outline-none appearance-none cursor-pointer transition w-full"
            >
              <option value="featured">Destacados de Halloween</option>
              <option value="price-asc">Menor precio (S/.)</option>
              <option value="price-desc">Mayor precio (S/.)</option>
              <option value="terror">Nivel de Terror / Maldición</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/60 border border-red-500 scale-105'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={(prod) => setActiveModalProduct(prod)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
          <p className="text-4xl mb-3">👻</p>
          <h3 className="text-lg font-bold text-white mb-1">
            Ningún manjar encontrado
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No se hallaron productos con los filtros seleccionados. Intenta borrar tu búsqueda o cambiar de categoría.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
          >
            Ver todos los productos
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

    </section>
  );
};
