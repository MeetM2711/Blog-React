import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article, articles = [], index = 0 } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentArticle, setCurrentArticle] = useState(article);
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : {};
  });

  useEffect(() => {
    if (articles.length > 0 && currentIndex !== undefined) {
      setCurrentArticle(articles[currentIndex]);
    }
  }, [currentIndex, articles]);

  const addComment = (newComment) => {
    const articleTitle = currentArticle?.title;
    if (articleTitle) {
      const updatedComments = {
        ...comments,
        [articleTitle]: [...(comments[articleTitle] || []), newComment],
      };
      setComments(updatedComments);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex)
      navigate(`/blogDetails/${prevIndex}`, { state: { article: articles[prevIndex], articles, index: prevIndex } });
    }
  };

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      navigate(`/blogDetails/${nextIndex}`, { state: { article: articles[nextIndex], articles, index: nextIndex } });
    }
  };

  if (!currentArticle) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3">
          <h1 className="text-3xl font-bold text-gray-800">Blog Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-6">
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentArticle.title}</h2>
          <p className="text-sm text-gray-600">
            by <span className="font-bold text-base">{currentArticle.author.name}</span> on{' '}
            <span className="font-bold text-base">{currentArticle.date}</span>
          </p>
          <img
            className="w-full h-[400px] object-cover mt-4 rounded-md"
            src={currentArticle.image_url}
            alt="Article"
          />
          <div className="mt-6 text-gray-700">
            <p>{currentArticle.description}</p>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Comments</h3>
          <CommentForm addComment={addComment} />
          <CommentList comments={comments[currentArticle.title] || []} />
        </section>
      </main>

      <button
        onClick={handlePrevious}
        className={`fixed w-10 h-10 top-1/2 left-0 border rounded-md bg-black z-10 text-white flex items-center justify-center ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className={`fixed w-10 h-10 top-1/2 right-0 border rounded-md bg-black z-10 text-white flex items-center justify-center ${currentIndex === articles.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentIndex === articles.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default BlogDetails;
