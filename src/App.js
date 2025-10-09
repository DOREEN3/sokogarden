import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Getproduct from './components/Getproduct';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
       <Navbar/>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Getproduct/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/addproduct" element={<Addproduct/>} />
        <Route path="/mpesapayment" element={<Mpesapayment/>} />

      </Routes>
    </BrowserRouter>
  );
}
export default App