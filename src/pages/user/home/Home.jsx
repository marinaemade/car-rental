import FeaturedCars from "./FeaturedCars";
import Hero from "./Hero";
import HowItWorks from './HowItWorks';
import TermsConditions from "./TermsConditions";
import Testimonials from "./Testimonials";
import ScrollToTop from "../../../components/common/ScrollToTop/ScrollToTop";
import { useAuth } from "../../../context/AuthContext";
const Home = () => {

const {user} = useAuth();
console.log(user); //it prints null in the console.

  return (
    <>
      <Hero/>
      <FeaturedCars/>
      <HowItWorks/>
      <TermsConditions/>
      <Testimonials/>
      <ScrollToTop />
    </>
  );
};

export default Home;