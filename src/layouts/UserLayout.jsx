import { Outlet } from 'react-router-dom';
import Nav from '../components/user/navbar/Nav';
import Footer from '../components/user/footer/Footer';
import ScrollToTop from '../components/common/ScrollToTop/ScrollToTop';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
