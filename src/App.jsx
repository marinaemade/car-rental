import {Route, Routes,Link} from "react-router-dom"
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Admin from './pages/adminPage/Admin';
import User from './pages/userPage/User';
import CarDetails from './pages/carDetails/CarDetails';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </div>
  )
}

export default App