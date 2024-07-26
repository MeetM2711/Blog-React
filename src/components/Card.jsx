import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/images/blog.webp';

const Card = ({ article, index, articles }) => {

 
  return (
    <div className="relative flex flex-col justify-between mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={article.author.profile_image_url || defaultImage} alt="card-image" className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 items-start">
          <div className='col-span-2'>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {article.title}
            </h5>
          </div>
          <div className='text-right'>
            <h6>{article.date}</h6>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <img 
            src={article.author.profile_image_url} 
            alt={`${article.author.name}'s profile`} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {article.author.name}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Link to={`/blogDetails/${index}`} state={{ article, articles, index }}>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
