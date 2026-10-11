import React from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ProductCard } from './components/ProductCard';
import { MarqueeTicker } from './components/MarqueeTicker';
import { SteroidComparisonSection } from './components/SteroidComparisonSection';
import { Studio3DSpotlight } from './components/Studio3DSpotlight';
import { IngredientAlchemySection } from './components/IngredientAlchemySection';
import { ReviewsGridSection } from './components/ReviewsGridSection';
import { FaqSection } from './components/FaqSection';
import { PRODUCTS } from './data/products';
import { ArrowRight } from 'lucide-react';

export function App() {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'track-order':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f3f2ee] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Fixed Sticky Luxury Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Slide-Over Basket Drawer */}
      <CartDrawer />

      {/* Floating 24/7 WhatsApp Ordering Badge */}
      <WhatsAppFloatingButton />

      {/* Global Luxury Footer */}
      <Footer />
    </div>
  );
}

export default App;

/**
 * Home View: Fully operational Awwwards-Level Storefront
 */
const HomeView: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useStore();

  const flagshipProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero 3D Stage matching brand packaging */}
      <HeroSection />

      {/* 2. Infinite Marquee Ticker (Gold & Crimson) */}
      <MarqueeTicker />

      {/* 3. The "Why Without Steroids?" Truth Section */}
      <SteroidComparisonSection />

      {/* 4. Official Flagship Product Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              Original Pakistani Packaging
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mt-1">
              Official Dail <span className="text-gold-gradient italic">Formulations</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-md font-light">
              Export quality batches crafted with pure cold-pressed botanical oils. Factory sealed with signature embossed lids.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
            }}
            className="px-6 py-2.5 rounded-full gold-glass-panel border border-[#d4af37]/40 text-[#f3e5ab] hover:text-white text-xs font-bold flex items-center gap-2 group transition-all"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Hero Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flagshipProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Interactive 3D Product Studio Spotlight */}
      <Studio3DSpotlight />

      {/* 6. Active Botanicals & Herbal Alchemy */}
      <IngredientAlchemySection />

      {/* 7. Real Customer Reviews from Pakistan */}
      <ReviewsGridSection />

      {/* 8. Interactive FAQ Accordion */}
      <FaqSection />

      {/* 9. Nationwide Logistics & COD Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-[#14161f] via-[#101217] to-[#14161f] border border-[#d4af37]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-xl">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black/60 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-xl shadow-inner">
              🇵🇰
            </div>
            <h4 className="text-white font-bold text-sm">Nationwide Delivery</h4>
            <p className="text-stone-300 text-xs">Express dispatch to Karachi, Lahore, Islamabad & all towns.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black/60 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-xl shadow-inner">
              💵
            </div>
            <h4 className="text-white font-bold text-sm">Cash On Delivery (COD)</h4>
            <p className="text-stone-300 text-xs">Open parcel, verify security seal, and pay at your doorstep.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black/60 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-xl shadow-inner">
              🛡️
            </div>
            <h4 className="text-white font-bold text-sm">Strictly Zero Steroids</h4>
            <p className="text-stone-300 text-xs">100% certified free from clobetasol, mercury, or skin bleaches.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black/60 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-xl shadow-inner">
              💬
            </div>
            <h4 className="text-white font-bold text-sm">WhatsApp Helpline</h4>
            <p className="text-stone-300 text-xs">Direct consultation with our herbalists 7 days a week on WhatsApp.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
