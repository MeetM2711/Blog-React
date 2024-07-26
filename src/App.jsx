import React from 'react';
import './App.css';
import Blog from './components/Blog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogDetails from './Pages/BlogDetails';
import Layout from './components/Layout';
import { SearchProvider } from './components/SearchContext';

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path='/' element={<Blog />} />
          <Route path="/blogDetails/:index" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
