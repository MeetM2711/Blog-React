import React, { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { SearchContext } from './SearchContext';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/prathamKyada/Json/master/blog.json');
      const data = await response.json();
      const filter = data.filter(
        (newData) => newData.author.profile_image_url && newData.author.name && newData.title && newData.date
      );
      setArticles(data);
      setFilteredArticles(filter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (query) => {
    const searchQuery = query.toLowerCase();
    const filtered = articles.filter((article) => article.title.toLowerCase().includes(searchQuery));
    setFilteredArticles(filtered);
  };

  return (
    <div className="relative py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredArticles.map((article, index) => (
          <Card
            key={index}
            article={article}
            index={index}
            articles={articles}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
