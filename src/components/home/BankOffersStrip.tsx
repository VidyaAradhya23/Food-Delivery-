import React, { useState } from 'react';
import { CreditCard, Copy, Check } from 'lucide-react';
import type { BankOffer } from '../../types';

interface BankOffersStripProps {
  offers: BankOffer[];
}

export const BankOffersStrip: React.FC<BankOffersStripProps> = ({ offers }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!offers || offers.length === 0) return null;

  const handleCopy = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="my-10">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard size={18} className="text-amber-500" />
        <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-slate-900">
          Payment & Bank Offers
        </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex-shrink-0 w-72 sm:w-80 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400/70 hover:shadow-[0_12px_28px_-6px_rgba(245,158,11,0.18)] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider">
                  {offer.bank}
                </span>
                {offer.code && (
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-700 hover:text-amber-700 hover:border-amber-300 transition-colors shadow-xs"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check size={11} className="text-emerald-600" />
                        <span className="text-emerald-600">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>{offer.code}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">{offer.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{offer.description}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span>
                {offer.minCartValue ? `Min Spend: ₹${offer.minCartValue.toLocaleString('en-IN')}` : 'No Min Spend'}
              </span>
              <span>Terms Apply</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
