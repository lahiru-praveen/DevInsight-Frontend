// 'use client'

// import React from 'react';
// import React from 'react';
//   import {
//     Button,
//     FormControl,
//     Flex,
//     Heading,
//     Input,
//     Stack,
//     Text,
//     useColorModeValue,
//   } from '@chakra-ui/react';

// const ForgetPassword1 = () => {
  

//   export default function FogetPassword() {
//     return (   
//       <Flex
//         minH={'100vh'}
//         align={'center'}
//         justify={'center'}
//         bg={useColorModeValue('gray.50', 'gray.800')}
//         direction="column"
//       >
//         <Heading
//           padding={5}
//           height="10vh"
//           fontFamily="Roboto"
//           fontWeight={700}
//           fontSize="33px"
//           lineHeight="40px"
//           textAlign="center"
//           marginBottom="2rem" // Adjust as needed
//         >
//           DevInsight
//         </Heading>
//         <Flex
//           direction="column"
//           align="center"
//         >
//           <Stack
//             spacing={8}
//             w={'full'}
//             maxW={'md'}
//             bg={useColorModeValue('white', 'gray.700')}
//             rounded={'xl'}
//             boxShadow={'lg'}
//             p={6}
//             my={12}
//           >
//             <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} textAlign={"center"} >
//               Forgot your password?
//             </Heading>
//             <Text
//               fontSize={{ base: 'sm', sm: 'md' }}
//               color={useColorModeValue('gray.800', 'gray.400')}
//               textAlign="center"
//             >
//               You'll get an email with a reset link
//             </Text>
//             <FormControl id="email">
//               <Input
//                 placeholder="your-email@example.com"
//                 _placeholder={{ color: 'gray.500' }}
//                 type="email"
//               />
//             </FormControl>
//             <Button
//               bg={'blue.400'}
//               color={'white'}
//               _hover={{
//                 bg: 'blue.500',
//               }}
//               w={'full'}
//             >
//               Request Reset
//             </Button>
//           </Stack>
//         </Flex>
//       </Flex>
//     );
//   }
//   return <div>Forget Password Component 1</div>;
// };

// export default ForgetPassword1;

import React from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const ForgetPassword1 = () => {
  return (   
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      direction="column"
    >
      <Heading
        padding={5}
        height="10vh"
        fontFamily="Roboto"
        fontWeight={700}
        fontSize="33px"
        lineHeight="40px"
        textAlign="center"
        marginBottom="2rem" // Adjust as needed
      >
        DevInsight
      </Heading>
      <Flex
        direction="column"
        align="center"
      >
        <Stack
          spacing={8}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} textAlign={"center"} >
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}
            textAlign="center"
          >
            You'll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            w={'full'}
          >
            Request Reset
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default ForgetPassword1;

