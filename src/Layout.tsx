import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <>
            <Header/>
            <ToastContainer/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
};

export default Layout;