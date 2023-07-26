import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Container from './components/layouts/Container';
import Messaage from '../src/components/layouts/Message'

//pages
import Home from './components/pages/Home';
//layouts
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

//pages
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import CreateProduct from './components/pages/product/CreateProduct';
import CreateColor from './components/pages/product/CreateColor';
import AddColorStock from './components/pages/product/AddColorStock';

// context
import { UserProvider } from './context/userContext';
import EditProduct from './components/pages/product/EditProduct';

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Messaage />
      <Container>
       
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<AddColorStock />} />
          <Route path="/products/register" element={<CreateProduct/>} />
          <Route path="/products/create-color" element={<CreateColor/>} />
          <Route path="/products/edit-product/:id" element={<EditProduct/>} />
          <Route path="/products/add-color-stock/:id" element={<AddColorStock/>} />
          <Route path="/" element={<Home />} />
        </Routes>

      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
