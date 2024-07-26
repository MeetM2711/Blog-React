import React from 'react'
import Logo from '../assets/images/blog.webp'
import SearchButton from './SearchButtton';

const Layout = () => {

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <header className='w-full h-24 pt-5 '>
      <div className="container">
        <div className='flex justify-between'>
          <div>
            <a href="">
              <img src={Logo} alt="" className='w-20 h-14' />
            </a>
          </div>

          <div>
            <SearchButton onSearch={handleSearch} />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Layout