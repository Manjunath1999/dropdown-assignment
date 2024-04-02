// Filename - App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.tsx';
import OrderBook from './OrderBook.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/orderBook" element={<OrderBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
