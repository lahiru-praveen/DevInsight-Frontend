import React from 'react';
import {
  Box,
  Container,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import ProfileCard from '../../components/Profile_page/user_profile.jsx';
import SkillCard from '../../components/Profile_page/skillCard.jsx'; // Adjust the import path as necessary
import CompanyCard from '../../components/Profile_page/companyCard.jsx';
import ProfileForm from '../../components/Profile_page/profileForm.jsx';
import CompanyForm from '../../components/Profile_page/companyForm.jsx';
import SkillForm from '../../components/Profile_page/skillform.jsx'; // Adjust the import path as necessary
import '../../index.css';

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML', 'Git', 'SQL'];
const companyDetails = {
  companyName: 'Company Inc.',
  companyUserName: 'companyuser',
  companyEmail: 'company@example.com',
  companyPhoneNumber: '123-456-7890',
  companyAddress: '123 Main Street, City, Country',
  companyPhoto: 'path/to/company/photo.jpg',
};

const initialProfile = {
  name: 'Buwaneka Marasinghe',
  profilePicture: 'path/to/your/image.png',
  skills: ['JavaScript', 'React', 'Node.js'],
};

const initialCompany = {
  companyName: 'Company Inc.',
  companyPhoneNumber: '123-456-7890',
  companyAddress: '123 Main Street, City, Country',
  companyPhoto: 'path/to/company/photo.jpg',
};

export default function AdminProfile() {
  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();
  const {
    isOpen: isCompanyModalOpen,
    onOpen: onCompanyModalOpen,
    onClose: onCompanyModalClose,
  } = useDisclosure();
  const {
    isOpen: isSkillsModalOpen,
    onOpen: onSkillsModalOpen,
    onClose: onSkillsModalClose,
  } = useDisclosure();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" p={4}>
      <Container maxW={{ base: '100%', md: '50%' }} mb={8}>
        <ProfileCard />
      </Container>
      <Container maxW={{ base: '100%', md: '50%' }} mb={8}>
        <SkillCard skills={skills} />
      </Container>
      <Container maxW={{ base: '100%', md: '50%' }} mb={8}>
        <CompanyCard company={companyDetails} />
      </Container>

      <Button colorScheme="blue" onClick={onProfileModalOpen} mb={4}>
        Edit Profile
      </Button>
      <Button colorScheme="blue" onClick={onSkillsModalOpen} mb={4}>
        Edit Skills
      </Button>
      <Button colorScheme="blue" onClick={onCompanyModalOpen}>
        Edit Company
      </Button>

      {/* Profile Edit Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={onProfileModalClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: '90%', md: '50%' }}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileForm initialProfile={initialProfile} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Skills Edit Modal */}
      <Modal isOpen={isSkillsModalOpen} onClose={onSkillsModalClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: '90%', md: '50%' }}>
          <ModalHeader>Edit Skills</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SkillForm initialSkills={skills} onSave={(updatedSkills) => console.log(updatedSkills)} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Company Edit Modal */}
      <Modal isOpen={isCompanyModalOpen} onClose={onCompanyModalClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: '90%', md: '50%' }}>
          <ModalHeader>Edit Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CompanyForm initialCompany={initialCompany} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

