// BackButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,} from '@chakra-ui/react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
const BackButton = () => {
  const navigate = useNavigate();
  const [backClicked, setBackClicked] = useState(false);

  const handleBackClick = () => {
    setBackClicked(true);
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
      <Button onClick={handleBackClick} leftIcon={<IoArrowBackCircleSharp />} variant="ghost">
        Go Back
      </Button>
      {backClicked && <p>Back button clicked!</p>}
    </div>
  );
};

export default BackButton;
