import BannerSlider from './components/home/BannerSlider';
import FeaturedProductsLayout from './components/home/featured-product/FeaturedProductsLayout';
import Footer from './components/Footer';
import WelcomeMessageLayout from './components/home/welcome-message/WelcomeMessageLayout';
import CategoryListLayout from './components/home/category-list/CategoryListLayout';

export default function Home() {

  return (
    <div className="bg-gray-100">
      <WelcomeMessageLayout />

      {/* Banner Slider */}
      <BannerSlider />

      {/* category lists  */}
      <CategoryListLayout />

      {/* Featured Products */}
      <FeaturedProductsLayout />

      {/* Footer */}
      <Footer />
    </div>
  )
}
