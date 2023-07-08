//import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
//COMPONENTS//PAGES
import Landing from "./pages/Landing/Landing";
import Accesorios from "./pages/Tabs/Accesorios/Accesorios";
import Iphone from "./pages/Tabs/Iphone/Iphone";
import Watch from "./pages/Tabs/Watch/Watch";
import Airpods from "./pages/Tabs/Airpods/Airpods";
import Favoritos from "./pages/Favs/Favs";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import NotFound from "./pages/ErrorElement/NotFound";
import Nav from "./pages/Nav/Nav";
import Dashboard from "./pages/dashboard/Dashboard";
import Glass from "./pages/Tabs/Accesorios/Glass/Glass";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Case from "./pages/Tabs/Accesorios/Case/Case";
import Energy from "./pages/Tabs/Accesorios/Energy/Energy";
import Terms from "./pages/Terms/Terms";
import AllProducts from "./pages/dashboard/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { checkUserExists, checkUserAdmin } from "../src/redux/actions";
import AllUsers from "./pages/dashboard/AllUsers";
import EditProd from "./pages/dashboard/EditProd";
import CreateProduct from "./pages/dashboard/CreateProduct";
import AllValues from "./pages/dashboard/AllValues";
import Cart from "./pages/Cart/Cart";
import FAQ from "./pages/Button/Faq/Faq";
import ContactUs from "./pages/Button/ContactUs/ContactUs";
import Tech from "./pages/Button/TechnicalService/Tech";
import Compare from "./pages/Button/Compare/Compare";
import EditValues from "./pages/dashboard/EditValues";
import DeleteProd from "./pages/dashboard/DeleteProd";
import Profile from "./pages/User/Profile";
import Feedback from "./pages/Checkout/Feedback";

function App() {
  const dispatch = useDispatch();
  const userCheck = useSelector((state) => state.checkUser);
  const { user } = useAuth0();

  useEffect(() => {
    const userData = {
      email: user?.email,
      email_verified: user?.email_verified,
      family_name: user?.family_name,
      given_name: user?.given_name,
      locale: user?.locale,
      name: user?.name,
      nickname: user?.nickname,
      picture: user?.picture,
      auth0Id: user?.sub,
    };
    if (userData) {
      dispatch(checkUserExists(userData));
    }
  }, [dispatch, user?.email]);

  useEffect(() => {
    const mail = user?.email;

    if (mail) {
      dispatch(checkUserAdmin(mail));
    }
  }, [dispatch, user?.email]);

  return (
    <Router>
      <Nav />
      <NavBar />
      <Footer />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/detalle/:id" element={<ProductDetail />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/airpods" element={<Airpods />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contactanos" element={<ContactUs />} />
        <Route path="/techservice" element={<Tech />} />
        <Route path="/comparar" element={<Compare />} />
        <Route path="/miperfil" element={<Profile />} />

        {userCheck && userCheck.isAdmin === true ? (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/allprods" element={<AllProducts />} />
            <Route path="/edit/:id" element={<EditProd />} />
            <Route path="/admin/allusers" element={<AllUsers />} />
            <Route path="/admin/allusers/edit" element={<AllUsers />} />
            <Route path="/admin/values" element={<AllValues />} />
            <Route path="/editarvalores/:id" element={<EditValues />} />
            <Route path="/admin/create" element={<CreateProduct />} />
            <Route path="/delete" element={<DeleteProd />} />
          </>
        ) : (
          <Route path="/404" element={<NotFound />} />
        )}

        {user ? (
          <Route path="/payment" element={<Checkout />} />
        ) : (
          <Route path="/404" element={<NotFound />} />
        )}

        <Route path="/glass" element={<Glass />} />
        <Route path="/fundas" element={<Case />} />
        <Route path="/charger" element={<Energy />} />
        <Route path="/terminos" element={<Terms />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
