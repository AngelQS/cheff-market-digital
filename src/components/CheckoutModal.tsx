import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, CheckCircle2, Download, RefreshCw, Sparkles, MapPin, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CompletedOrder } from '../types';
import { soundFX } from '../utils/audioEffects';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    total,
    subtotal,
    discount,
    shipping,
    clearCart,
  } = useCart();

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('Av. Del Terror 666, Cripta 4B, Lima - Tribu TI');
  const [deliveryOption, setDeliveryOption] = useState<'tumba' | 'cripta' | 'express_demonio'>('express_demonio');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  // Format Card Number (PAN) with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setExpiry(raw);
    }
  };

  // Quick autofill test cards
  const autofillCard = (type: 'visa' | 'master' | 'amex') => {
    if (type === 'visa') {
      setCardNumber('4556 7890 1234 5678');
      setCardHolder('CHEF DRÁCULA DE TI');
      setExpiry('10/28');
      setCvv('666');
    } else if (type === 'master') {
      setCardNumber('5412 8888 9999 1313');
      setCardHolder('BRUJA TECH LEAD');
      setExpiry('12/29');
      setCvv('777');
    } else {
      setCardNumber('3782 8224 6310 0050');
      setCardHolder('FANTASMA DEV OPS');
      setExpiry('08/27');
      setCvv('123');
    }
    soundFX.playCauldronBubble();
  };

  // Submit and simulate fake checkout
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      alert('Por favor completa los campos ficticios de la tarjeta.');
      return;
    }

    setIsProcessing(true);
    setProcessStep(1);

    // Step 1: Contacting underworld network
    setTimeout(() => {
      setProcessStep(2);
    }, 1000);

    // Step 2: Validating fake PAN
    setTimeout(() => {
      setProcessStep(3);
    }, 2000);

    // Step 3: Approval & Confetti
    setTimeout(() => {
      setIsProcessing(false);
      const fakeOrder: CompletedOrder = {
        orderId: `HELL-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('es-PE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items: [...items],
        subtotal,
        shipping,
        discount,
        total,
        payment: {
          cardNumber,
          cardHolder,
          expiry,
          cvv,
          address,
          deliveryOption,
        },
      };

      setCompletedOrder(fakeOrder);
      clearCart();
      soundFX.playVictoryChime();

      // Trigger Halloween victory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E51920', '#FF5E00', '#9333EA', '#10B981', '#FBBF24'],
        });
      } catch {
        // ignore
      }
    }, 3200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-[#0e0f1a] rounded-3xl border border-red-900/70 shadow-2xl shadow-red-950 overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#131422] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-950">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  CursedPay 666
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Simulación de Pasarela
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Transacción 100% ficticia para el Concurso de Halloween de la Tribu TI
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8">
          
          {/* PROCESSING STATE */}
          {isProcessing && (
            <div className="py-14 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <RefreshCw className="w-20 h-20 text-red-500 animate-spin" />
                <Skull className="w-8 h-8 text-white absolute inset-0 m-auto animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Procesando Pago del Más Allá...
                </h3>
                <div className="max-w-xs mx-auto space-y-2 text-xs text-slate-300">
                  <div className={`p-2 rounded-lg transition ${processStep >= 1 ? 'bg-red-950/60 text-red-200 border border-red-900/50' : 'text-slate-500'}`}>
                    1. Invocando servidor del inframundo... {processStep >= 1 && '✓'}
                  </div>
                  <div className={`p-2 rounded-lg transition ${processStep >= 2 ? 'bg-red-950/60 text-red-200 border border-red-900/50' : 'text-slate-500'}`}>
                    2. Validando PAN ficticio y fondos de almas... {processStep >= 2 && '✓'}
                  </div>
                  <div className={`p-2 rounded-lg transition ${processStep >= 3 ? 'bg-red-950/60 text-red-200 border border-red-900/50' : 'text-slate-500'}`}>
                    3. Sellando recibo con la sangre del Chef... {processStep >= 3 && '✓'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPLETED ORDER CONFIRMATION */}
          {!isProcessing && completedOrder && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-600/60 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  ¡Transacción Fantasmal Exitosa!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Tu Pedido Ha Sido Invocado
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Comprobante generado para el Concurso de Halloween de la Tribu TI Digital.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-5 rounded-2xl bg-[#141525] border border-slate-700/80 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400">Código de Pedido:</span>
                    <strong className="block text-red-400 font-mono text-sm">{completedOrder.orderId}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400">Fecha del Siniestro:</span>
                    <strong className="block text-white text-xs">{completedOrder.date}</strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider block">
                    Manjares Adquiridos:
                  </span>
                  {completedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-slate-200">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span className="font-mono">S/. {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-700 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Titular Ficticio:</span>
                    <span className="text-white font-semibold">{completedOrder.payment.cardHolder}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tarjeta PAN (Simulada):</span>
                    <span className="text-white font-mono">•••• •••• •••• {completedOrder.payment.cardNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Dirección de Entrega:</span>
                    <span className="text-white">{completedOrder.payment.address}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-700">
                    <span>Monto Pagado:</span>
                    <span className="font-mono text-red-400 text-lg">S/. {completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Tribu Stamp */}
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-center">
                  <span className="text-[11px] font-black tracking-widest text-red-300 uppercase">
                    🎃 CERTIFICADO OFICIAL TRIBU TI DIGITAL - CHEFF MARKET 2026 🔪
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Imprimir Comprobante</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <span>Volver al Mercado</span>
                </button>
              </div>

            </div>
          )}

          {/* NORMAL PAYMENT FORM */}
          {!isProcessing && !completedOrder && (
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              
              {/* Interactive 3D Credit Card Preview */}
              <div className="relative h-48 sm:h-52 w-full max-w-md mx-auto rounded-2xl p-6 bg-gradient-to-tr from-red-950 via-slate-900 to-red-900 border border-red-700/60 shadow-2xl shadow-red-950/80 text-white flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 text-8xl opacity-10 select-none">
                  🎃
                </div>

                {/* Card Top Row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-7 rounded bg-amber-400/90 border border-amber-300/60 flex items-center justify-center shadow-inner">
                      <div className="w-6 h-4 border border-amber-600/60 rounded-sm" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-300">CURSED CHIP</span>
                  </div>
                  <span className="font-['Creepster'] text-xl text-red-400 tracking-wider">
                    CHEFF PAY 666
                  </span>
                </div>

                {/* Card Number (PAN) */}
                <div className="relative z-10 my-auto">
                  <div className="font-mono text-lg sm:text-xl font-bold tracking-[0.2em] text-white drop-shadow">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                </div>

                {/* Card Bottom Row */}
                <div className="flex items-end justify-between relative z-10 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Titular</span>
                    <span className="font-semibold uppercase tracking-wider truncate max-w-[180px] block">
                      {cardHolder || 'NOMBRE DEL CLIENTE'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Expira</span>
                    <span className="font-mono font-semibold">
                      {expiry || 'MM/AA'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Fill Test Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-slate-400 mr-1">Rellenar tarjeta demo:</span>
                <button
                  type="button"
                  onClick={() => autofillCard('visa')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-red-300 border border-slate-700 transition"
                >
                  👻 Visa Fantasma
                </button>
                <button
                  type="button"
                  onClick={() => autofillCard('master')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-orange-300 border border-slate-700 transition"
                >
                  💀 MasterCursed
                </button>
                <button
                  type="button"
                  onClick={() => autofillCard('amex')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-purple-300 border border-slate-700 transition"
                >
                  🦇 Amex Vampiro
                </button>
              </div>

              {/* Inputs Form */}
              <div className="space-y-4">
                
                {/* PAN Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Número de Tarjeta Falso (PAN)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm tracking-wider focus:border-red-500 focus:outline-none transition"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Cardholder */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Nombre del Titular (Fantasía o Real)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="EJ. VLADIMIR EL CHEF"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-red-500 focus:outline-none transition uppercase"
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Vencimiento (MM/AA)
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/AA"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm text-center focus:border-red-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Código CVV Falso (3 dígitos)
                    </label>
                    <input
                      type="password"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="666"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm text-center focus:border-red-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Dirección de Entrega / Cripta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Dirección ficticia para el despacho"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-red-500 focus:outline-none transition"
                    />
                    <MapPin className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('express_demonio')}
                    className={`p-2 rounded-xl border text-center transition ${deliveryOption === 'express_demonio' ? 'bg-red-950/70 border-red-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    🦇 Murciélago Express (30m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('cripta')}
                    className={`p-2 rounded-xl border text-center transition ${deliveryOption === 'cripta' ? 'bg-red-950/70 border-red-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    ⚰️ Enviar a Cripta
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('tumba')}
                    className={`p-2 rounded-xl border text-center transition ${deliveryOption === 'tumba' ? 'bg-red-950/70 border-red-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                  >
                    🍲 Retiro en Caldero TI
                  </button>
                </div>

              </div>

              {/* Security info note */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulación protegida. Ningún cobro bancario real es efectuado. Diseñado para ganar el concurso.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-red-950 flex items-center justify-center gap-2 transition transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Simular Pago Falso (S/. {total.toFixed(2)})</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
