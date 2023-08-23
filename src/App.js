// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemManagement from './components/ItemManagement';
import Katalog from './components/Katalog';
import About from './components/About';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/item-management' element={<ItemManagement />}></Route>
          <Route path='/katalog' element={<Katalog />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
