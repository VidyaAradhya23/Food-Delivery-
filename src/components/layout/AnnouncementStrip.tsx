import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementStrip: React.FC = () => {
  return (
    <div className="bg-[#13221C] text-[#F7F9F6] border-b border-white/10 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 overflow-hidden h-[var(--announcement-height)]">
      <Sparkles size={13} className="text-[#E5A93C] animate-pulse hidden sm:inline" />
      <span className="truncate font-medium text-[11px] sm:text-xs text-[#F7F9F6]">
        <span className="text-[#E5A93C] font-extrabold mr-1.5 uppercase tracking-wider">✨ Gourmet Express:</span>
        Flat 50% OFF up to ₹150 on your first 3 artisan orders • Use code <span className="font-bold underline text-[#E5A93C]">GOURMET50</span>
      </span>
      <Sparkles size={13} className="text-[#25A18E] animate-pulse hidden sm:inline" />
    </div>
  );
};
