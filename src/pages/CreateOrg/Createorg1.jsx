import React from 'react';
import { Box, HStack, Image, Heading } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import OrganizationForm from '../../components/CreateOrg/RegForm.jsx'

function InteractiveForm() {
    return (
        <HStack className="h-full">
            <Box w="50%" p={8} bg="gray.50" rounded="lg" className="flex flex-col justify-center items-center overflow-y-auto">
                {/* Content for the left side */}
                {/* Example: */}
                <Image src={Devinsight} alt="DevInsight" maxW="200px" maxH="200px" />
                <Heading as="h3" size="lg" textAlign="center" mt={4}>
                    Welcome to DevInsight
                </Heading>
                {/* Add more content as needed */}
            </Box>
            <Box w="50%" p={8} bg="white" rounded="lg" className="flex justify-center items-center overflow-y-auto">
                {/* OrganizationForm component */}
                <OrganizationForm />
            </Box>
        </HStack>
    );
}

export default InteractiveForm;