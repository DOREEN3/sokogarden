import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Getproduct from './components/Getproduct';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
    <BrowserRouter>
      {/* Navigation */}
       <Navbar/>
      {/* Routes */}
      <main className="flex-fill">
      <Routes>
        <Route path="/" element={<Getproduct/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/addproduct" element={<Addproduct/>} />
        <Route path="/mpesapayment" element={<Mpesapayment/>} />

      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}
export default App