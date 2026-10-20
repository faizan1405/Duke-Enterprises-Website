import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Copy, Check, ShieldCheck, PhoneCall } from 'lucide-react';
import { COMPANY_FACTS } from '@/data/machineryData';

interface WhatsAppModalProps {
  isOpen: boolean;
  initialMessage?: string;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  initialMessage = 'Hello Duke Enterprises, I am inquiring regarding your industrial machinery and would like to receive product catalogues and technical guidance.',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [previewed, setPreviewed] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-steel-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#075E54] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-tight">Duke Enterprises WhatsApp Support</h3>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Technical & Sales Desk • Est. 2002
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-xs font-mono uppercase tracking-wider text-steel-500 font-semibold mb-1.5">
              Enquiry Message Preview
            </label>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3.5 text-xs sm:text-sm text-navy-900 bg-surface-offwhite rounded-xl border border-steel-200 focus:border-amber-primary focus:outline-none resize-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white border border-steel-200 text-steel-600 hover:text-navy-900 text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick contact phones */}
          <div className="mb-5 p-3 rounded-xl bg-surface-muted border border-steel-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-steel-700">
              <PhoneCall className="w-4 h-4 text-amber-primary" />
              <span className="font-medium">Direct Telephone Desk:</span>
            </div>
            <div className="font-mono font-semibold text-navy-900">
              {COMPANY_FACTS.phones[0]}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => setPreviewed(true)}
              className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-sm font-semibold tracking-wide transition-all shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{previewed ? 'Enquiry preview prepared' : 'Preview WhatsApp Enquiry'}</span>
              {previewed && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-5 py-2.5 rounded-xl bg-surface-offwhite hover:bg-steel-200 text-steel-700 text-xs font-medium transition-colors cursor-pointer"
            >
              Continue Browsing Catalogue
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-surface-muted border-t border-steel-200/60 text-[11px] text-steel-500 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>No checkout or online payments. All equipment inquiries handled directly by Duke technical representatives.</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppModal;
