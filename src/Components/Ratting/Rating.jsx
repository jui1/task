import React, { useState } from 'react';

const Rating = () => {
  // Define predefined parameters and their initial ratings
  const initialParameters = [
    { name: 'Communication Skills', rating: 0 },
    { name: 'Problem Solving', rating: 0 },
    { name: 'Teamwork', rating: 0 },
    { name: 'Technical Knowledge', rating: 0 },
    { name: 'Adaptability', rating: 0 },
    { name: 'Work Ethic', rating: 0 },
    { name: 'Creativity', rating: 0 },
    { name: 'Time Management', rating: 0 },
    { name: 'Professionalism', rating: 0 },
    { name: 'Attention to Detail', rating: 0 },
  ];

  // State to manage the list of parameters and their ratings
  const [parameters, setParameters] = useState(initialParameters);

  // Function to handle rating change for a specific parameter
  const handleRatingChange = (index, newRating) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].rating = newRating;
    setParameters(updatedParameters);
  };

  return (
    <div>
      <h1>Interviewer Rating</h1>
      <ul>
        {parameters.map((param, index) => (
          <li key={index}>
            <strong>{param.name}</strong>
            <br />
            {/* Display stars for rating */}
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                style={{ cursor: 'pointer', color: starIndex < param.rating ? 'gold' : 'grey' }}
                onClick={() => handleRatingChange(index, starIndex + 1)}
              >
                &#9733;
              </span>
            ))}
          </li>
        ))}
      </ul>
      {/* Display overall rating summary */}
      <p>
        Overall Rating: {parameters.reduce((total, param) => total + param.rating, 0)}/{parameters.length * 5}
      </p>
    </div>
  );
};

export default Rating;
