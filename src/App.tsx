import React from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { WishlistPage } from './components/WishlistPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminPortal } from './components/AdminPortal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ProductCard } from './components/ProductCard';
import { MarqueeTicker } from './components/MarqueeTicker';
import { RegimenDuoSection } from './components/RegimenDuoSection';
import { SteroidComparisonSection } from './components/SteroidComparisonSection';
import { ProductStudioSpotlight } from './components/ProductStudioSpotlight';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { IngredientAlchemySection } from './components/IngredientAlchemySection';
import { VideoTestimonialsSection } from './components/VideoTestimonialsSection';
import { ReviewsGridSection } from './components/ReviewsGridSection';
import { FaqSection } from './components/FaqSection';
import { PRODUCTS } from './data/products';
import { ArrowRight, Truck, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

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
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#7b3e1d] selection:text-white antialiased">
      {/* 1. Global Clean Luxury Header & Announcement */}
      <Navbar />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 3. Global Slide-Over Cart Drawer (Shopify Grade) */}
      <CartDrawer />

      {/* 4. Global Search Modal */}
      <SearchModal />

      {/* 5. Global Quick View Modal */}
      <QuickViewModal />

      {/* 6. Floating 24/7 WhatsApp Ordering Button */}
      <WhatsAppFloatingButton />

      {/* 7. Prestige Luxury Footer */}
      <Footer />
    </div>
  );
}

export default App;

/**
 * Home View: Clean, High-End D2C Storefront (Rhode / Aesop / Blossom Organics Grade)
 */
const HomeView: React.FC = () => {
  const { products, setCurrentPage, setSelectedCategory } = useStore();

  const flagshipProducts = products.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-20">
      
      {/* 1. Clean Editorial Hero Section */}
      <HeroSection />

      {/* 2. Modern Clean Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. High-Converting Regimen Duo Bundle Section */}
      <RegimenDuoSection />

      {/* 4. Best Sellers Collection Showcase */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6 sm:mb-10">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#c59b27]">
              Official Pakistani Formulations
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mt-1">
              Best-Selling <span className="text-[#7b3e1d] italic">Organic Essentials</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-lg font-normal">
              Authentic export-quality batches crafted with cold-pressed botanical oils. Factory sealed with signature embossed lids.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
            }}
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 hover:text-[#7b3e1d] text-xs font-bold flex items-center gap-2 group transition-all shadow-2xs cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Flagship Product Cards: 2-Cols on Mobile for zero side margin waste, 4-Cols on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {flagshipProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Ultra-Luxury Interactive Product Studio Spotlight with Multi-Angle Lens & Macro Zoom */}
      <ProductStudioSpotlight />

      {/* 6. Medical Truth: "Why Without Steroids?" Trust Comparison */}
      <SteroidComparisonSection />

      {/* 7. Herbal Alchemy & Active Bio-Botanicals */}
      <IngredientAlchemySection />

      {/* 8. Video UGC Customer Unboxings & Testimonials */}
      <VideoTestimonialsSection />

      {/* 9. Verified Customer Reviews Infinite Marquee */}
      <ReviewsMarquee />

      {/* 10. Verified Customer Reviews Grid & Interactive Submission */}
      <ReviewsGridSection />

      {/* 11. Customer FAQ Accordion */}
      <FaqSection />

      {/* 11. Nationwide Logistics & COD Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-xs">
          
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#7b3e1d] border border-amber-200/60 flex items-center justify-center mx-auto text-xl">
              🇵🇰
            </div>
            <h4 className="text-stone-900 font-bold text-sm">Nationwide Delivery</h4>
            <p className="text-stone-500 text-xs">Express dispatch to Karachi, Lahore, Islamabad, Faisalabad & all towns.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#7b3e1d] border border-amber-200/60 flex items-center justify-center mx-auto text-xl">
              💵
            </div>
            <h4 className="text-stone-900 font-bold text-sm">Cash On Delivery (COD)</h4>
            <p className="text-stone-500 text-xs">Receive parcel, inspect tamper-proof seal, and pay at your doorstep.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#7b3e1d] border border-amber-200/60 flex items-center justify-center mx-auto text-xl">
              🛡️
            </div>
            <h4 className="text-stone-900 font-bold text-sm">Strictly Zero Steroids</h4>
            <p className="text-stone-500 text-xs">100% certified free from clobetasol, betamethasone, or toxic mercury.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#7b3e1d] border border-amber-200/60 flex items-center justify-center mx-auto text-xl">
              💬
            </div>
            <h4 className="text-stone-900 font-bold text-sm">24/7 WhatsApp Helpline</h4>
            <p className="text-stone-500 text-xs">Direct consultation with botanical experts 7 days a week on WhatsApp.</p>
          </div>

        </div>
      </section>

    </div>
  );
};
