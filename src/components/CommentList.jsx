import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className='flex flex-col '>
      <div className='mb-3'>
        <h2 className='font-semibold text-l'>Comments List :</h2>
      </div>
      <div className='flex flex-col justify-center items-center'>
        {comments.map((comment, idx) => (
          <div key={idx} className="mb-6 w-2/3 bg-slate-200 rounded-xl p-6">
            <div className='flex justify-between items-center '>

              <p className="font-semibold uppercase text-xl text-gray-800">{comment.name}</p>
              <p className="text-gray-600 text-sm">{comment.date}</p>
            </div>
            <p className="mt-2 text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
