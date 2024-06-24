import React, { useState, useRef, useCallback } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import Webcam from "react-webcam";

const FaceCaptureModal = ({ userId, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages([...capturedImages, imageSrc]);
    }
  }, [webcamRef, capturedImages]);

  

  const handleSave = async (userId, images) => {
    try {
      for (let i = 0; i < images.length; i++) {
        const response = await axios.post("/api/save-face-image", {
          user_id: userId,
          image: images[i],
        });
        console.log(response.data);
      }
      alert("Images saved successfully!");
    } catch (error) {
      console.error("Error saving images", error);
      alert("Failed to save images.");
    }
  };


  return (
    <>
      <Button onClick={onOpen}>Register Your Face</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capture Your Face</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
            />
            <Button mt={4} onClick={capture}>Capture</Button>
            <div>
              {capturedImages.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`captured-${index}`} width={100} />
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FaceCaptureModal;
