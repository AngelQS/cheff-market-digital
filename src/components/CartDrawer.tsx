import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    setIsCheckoutOpen,
    couponCode,
    setCouponCode,
    applyCoupon,
    couponApplied,
  } = useCart();

  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponError, setCouponError] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError(false);
      setCouponCode(couponInput);
    } else {
      setCouponError(true);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0d0e17] border-l border-slate-200 dark:border-red-900/60 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50 dark:bg-[#121320]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-red-950/60 border border-rose-200 dark:border-red-800/50 text-red-600 dark:text-red-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Caldero de Compras
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {items.length} {items.length === 1 ? 'manjar seleccionado' : 'manjares seleccionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  title="Vaciar caldero"
                  className="p-2 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-red-950/30 border border-rose-200 dark:border-red-900/40 flex items-center justify-center text-4xl mb-4 animate-float">
                  👻
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Tu caldero está vacío
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                  Las almas en pena tienen hambre. Agrega frutas tenebrosas, pócimas del bar o cortes gourmet de nuestros chefs.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Explorar Manjares
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#131422] border border-slate-200 dark:border-slate-800/80 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-900 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-red-500 transition">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 font-mono font-semibold mt-0.5">
                        S/. {product.price.toFixed(2)} c/u
                      </p>
                    </div>

                    {/* Stepper + Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-slate-900 dark:text-white w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                        S/. {(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#121320] space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(false);
                    }}
                    placeholder="Cupón (ej. SQUADTI)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 uppercase tracking-wider focus:border-red-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shrink-0"
                >
                  {couponApplied ? 'Aplicado ✓' : 'Aplicar'}
                </button>
              </form>

              {couponApplied && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  ¡Cupón SQUADTI activado! 20% de descuento del inframundo.
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-red-400 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Cupón inválido. Prueba con <strong>SQUADTI</strong>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold">S/. {subtotal.toFixed(2)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Descuento Maldito (20%):</span>
                    <span className="font-mono">- S/. {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío a Cripta:</span>
                  <span className="font-mono font-semibold">
                    {shipping === 0 ? (
                      <strong className="text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">¡Gratis!</strong>
                    ) : (
                      `S/. ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Total Final:</span>
                  <span className="font-mono text-red-600 dark:text-red-500 text-lg">
                    S/. {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-950 flex items-center justify-center gap-2 transition transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Proceder al Pago Infernal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
