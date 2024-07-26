import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', contact: '', comment: '' });

  const validateName = (name) => {
    if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validateContact = (contact) => {
    if (contact.length !== 10) {
      return 'Contact number must be exactly 10 digits';
    }
    return '';
  };

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const commentError = comment.length === 0 ? 'Comment cannot be empty' : '';

    setErrors({ name: nameError, email: emailError, contact: contactError, comment: commentError });

    return !(nameError || emailError || contactError || commentError);
  };

  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setContact(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newComment = { name, email, contact, comment, date: new Date().toLocaleDateString() };
      addComment(newComment);
      setName('');
      setEmail('');
      setContact('');
      setComment('');
      setErrors({ name: '', email: '', contact: '', comment: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 text-center">
      <div className="w-full grid grid-cols-2 gap-10 justify-between my-5">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border ${errors.name ? 'border-red-500' : 'border-black'} rounded-lg w-full p-2 text-lg`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border ${errors.email ? 'border-red-500' : 'border-black'} rounded-lg w-full p-2 text-lg`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="flex flex-col my-5">
        <input
          type="text"
          maxLength={10}
          placeholder="Enter Contact No"
          value={contact}
          onChange={handleContactChange}
          className={`border ${errors.contact ? 'border-red-500' : 'border-black'} rounded-lg w-full p-2 text-lg`}
          required
        />
        {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
      </div>
      <div className="flex flex-col my-5">
        <textarea
          className={`w-full p-4 rounded-lg border ${errors.comment ? 'border-red-500' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows="4"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
