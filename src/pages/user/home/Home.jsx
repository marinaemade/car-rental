import FeaturedCars from "./FeaturedCars";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import TermsConditions from "./TermsConditions";
import Testimonials from "./Testimonials";
import ScrollToTop from "../../../components/common/ScrollToTop/ScrollToTop";
const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCars/>
      <HowItWorks/>
      <TermsConditions/>
      <Testimonials/>
      <ScrollToTop />
    </>
  );
};

export default Home;
