import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { CATEGORIES, FEATURED_PRODUCTS, type ProductItem } from '@/data/machineryData';
interface Props { onViewDetails: (p: ProductItem) => void; onWhatsAppEnquire: (p: ProductItem) => void; selectedCategoryId?: string | null; }
export default function ProductsSection({ onViewDetails, onWhatsAppEnquire, selectedCategoryId }: Props) {
  const [local, setLocal] = useState<string | null>(null); const active = selectedCategoryId ?? local;
  const products = useMemo(() => active ? FEATURED_PRODUCTS.filter(p => p.categoryId === active) : FEATURED_PRODUCTS.slice(0,6), [active]);
  const current = CATEGORIES.find(c => c.id === active);
  return <section id="products" className="bg-[#f7f5f0] py-24 sm:py-32"><div className="shell"><div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
    <aside className="lg:sticky lg:top-28 lg:self-start"><span className="eyebrow">Machinery index</span><h2 className="display-title mt-5 text-4xl font-semibold">Find the right process.</h2><p className="mt-5 text-sm leading-6 text-[#676e6c]">Select an equipment family to narrow the showroom.</p>
      <div className="mt-8 hidden border-t border-[#d6d8d4] lg:block"><button onClick={()=>setLocal(null)} className={`flex w-full items-center justify-between border-b px-1 py-4 text-left text-xs font-semibold ${!active?'border-[#0d6768] text-[#0d6768]':'border-[#d6d8d4] text-[#666d6b]'}`}>Curated selection {!active&&<ArrowRight className="size-3.5"/>}</button>{CATEGORIES.map(c=><button key={c.id} onClick={()=>setLocal(c.id)} className={`flex w-full items-center justify-between border-b px-1 py-4 text-left text-xs font-semibold transition-colors ${active===c.id?'border-[#0d6768] text-[#0d6768]':'border-[#d6d8d4] text-[#666d6b] hover:text-[#e27b50]'}`}>{c.name} {active===c.id&&<ArrowRight className="size-3.5"/>}</button>)}</div>
    </aside>
    <main><div className="flex gap-2 overflow-x-auto pb-3 lg:hidden"><button onClick={()=>setLocal(null)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${!active?'border-[#0d6768] bg-[#0d6768] text-white':'border-[#cfd3ce] bg-white'}`}>Selected</button>{CATEGORIES.map(c=><button key={c.id} onClick={()=>setLocal(c.id)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${active===c.id?'border-[#0d6768] bg-[#0d6768] text-white':'border-[#cfd3ce] bg-white'}`}>{c.name}</button>)}</div>
      <header className="border-b border-[#cfd3ce] pb-8"><p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#e27b50]">{current ? 'Selected category' : 'Featured machinery'}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] sm:text-5xl">{current?.name ?? 'The working collection'}</h3><p className="mt-4 max-w-2xl text-sm leading-6 text-[#676e6c]">{current?.description ?? 'A curated view across mixing, roasting, coating, sifting and drying applications.'}</p></header>
      {products.length ? products.map((p,i)=><ProductCard key={p.id} product={p} index={i} onViewDetails={onViewDetails} onWhatsAppEnquire={onWhatsAppEnquire}/>) : <div className="border-b border-[#cfd3ce] py-20 text-sm text-[#676e6c]">This category is available for direct enquiry. Product details will be added when verified.</div>}
    </main>
  </div></div></section>;
}
