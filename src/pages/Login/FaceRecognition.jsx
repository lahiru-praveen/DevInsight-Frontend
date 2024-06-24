// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// const FaceRecognition = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [message, setMessage] = useState('');
//   const [cameraOn, setCameraOn] = useState(true);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImageSrc(imageSrc);
//     uploadImage(imageSrc);
//   };

//   const uploadImage = async (image) => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/face-recognition-login', {
//         image
//       });
//       if (response.data.success) {
//         setMessage('Login successful!');
//         sessionStorage.setItem('email', response.data.email);
//         navigate('/db');
//       } else {
//         setMessage('Face not recognized.');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setMessage('Error logging in.');
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-xl">
//       <h1 className="text-2xl font-bold mb-6">Face Recognition Login</h1>
//       <div className="flex flex-col items-stretch w-full">
//         {cameraOn && (
//           <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={640}
//               height={480}
//             />
//           </div>
//         )}
//         {cameraOn && (
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={capture}
//           >
//             Capture
//           </button>
//         )}
//         {imageSrc && (
//           <div className="mt-4">
//             <h2 className="text-md font-bold mb-2">Captured Image:</h2>
//             <img src={imageSrc} alt="Captured" className="rounded-lg" />
//           </div>
//         )}
//         <p className={message.includes('Error') ? 'text-red-500' : 'text-green-500'}>{message}</p>
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import Webcam from "react-webcam";

const Login = () => {
  const [user, setUser] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const webcamRef = React.useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  const capture = async () => {
    setCapturing(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      toast({
        title: "Capture failed",
        description: "Could not capture image. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setCapturing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", dataURItoBlob(imageSrc));
      const response = await axios.post("http://localhost:8000/api/face-recognition-login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.data.success) {
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('isLoggedIn', true);
        setUser({ email: response.data.email });
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate('/db');
      } else {
        toast({
          title: "Login failed",
          description: "Face recognition failed. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during face recognition login", error);
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setCapturing(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <Box className="flex justify-center items-center h-screen bg-gray-100">
      {user ? (
        <VStack spacing={4}>
          <Heading as="h2">Welcome, {user.email}!</Heading>
          <Button
            colorScheme="blue"
            onClick={() => {
              sessionStorage.clear();
              setUser(null);
            }}
          >
            Log out
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4} p={6} boxShadow="md" bg="white" rounded="md">
          <Heading as="h2">Login</Heading>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            videoConstraints={{ facingMode: "user" }}
            className="rounded-lg"
          />
          <Button
            colorScheme="teal"
            onClick={capture}
            isLoading={capturing}
            loadingText="Capturing"
          >
            Capture
          </Button>
          <Link to ="/login-developer">
          <Button
            colorScheme="gray"
          >
            Cancel
          </Button>
          </Link>
        </VStack>
      )}
    </Box>
  );
};

export default Login;


