
import {Route, Routes,Link} from "react-router-dom"
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Admin from './pages/adminPage/Admin';
import User from './pages/userPage/User';
import CarDetails from './pages/carDetails/CarDetails';
import Cars from "./pages/cars/Cars";
import Nav from './components/navbar/Nav';
import About from './pages/about/About';
import Footer from "./components/footer/Footer";
import Contact from './pages/contact/Contact';
import Cart from './pages/Cart/Cart';
import Reservation from './pages/reservation/Reservation';
import Checkout from './pages/checkout/Checkout';



const App = () => {
  return (
    <div>
      <Nav/>

      <Routes>
      // Marina
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      
        // Hanin
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>

        //Rahma
        <Route path="/dashboard" element={<Admin/>}/>

       
    

        //Merna
       <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars/>}/>

        //Fatma
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/reservation" element={<Reservation/>}/>

        //Mina
        <Route path="/checkout" element={<Checkout/>}/>

        // Not Found
        <Route path="*" element={<NotFound/>}/>
      </Routes>

      <Footer/>

    </div>
  );
};

export default App;
