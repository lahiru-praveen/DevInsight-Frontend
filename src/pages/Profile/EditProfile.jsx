import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  Card,
  CardBody
} from '@chakra-ui/react';

import ProfilePic from "../../assets/profile pic.jpg"
import ComLogo from "../../assets/99x.png"

function ProfileEditPage() {
  // State variable to hold programming languages
  const [languages] = useState(['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go']);

  return (
    <Flex>
      {/* Left side of the page */}
      <div className="w-1/2 h-screen">
        <Card className="ml-10 mt-10 w-5/6 h-screen" variant='outline'>
          <CardBody className="flex flex-col justify-evenly">
            {/* Profile picture */}
            <img src={ProfilePic} className="rounded-full w-64 h-64 mx-auto" />

            <center>
              {/* User information */}
              <Heading className="p-3">Lahiru Praveen</Heading>
              <Text>@Lahiru_Pr</Text>
              <Text className='mb-3'>Lahiruprveen@gmail.com</Text>

              {/* Edit profile button */}
              <Button size='xs' variant='solid' colorScheme='blue'>
                DEVELOPER
              </Button>
            </center>

            {/* Edit profile button */}
            <div className="mt-20">
              <Button w={'full'} variant='solid' colorScheme='blue'>
                Edit Profile
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right side of the page */}
      <div className="w-1/2">
        {/* Company card */}
        <Card className="h-2/5 mt-10 mb-10 ml-10 w-5/6" variant='outline'>
          <CardBody>
            {/* Company logo */}
            <div className="float-left mr-4 mt-16">
              <img src={ComLogo} alt="Company Logo"  width="200" height="100" />
            </div>
            <Text className='text-right mr-10'>99x</Text><br/>
            <Text className='text-right mr-10'>125ILM</Text><br/>
            <Text className='text-right mr-10'>99Xprvt</Text><br/>
            <a href="https://99x.io" class="text-right"> 99x - Creating impactful digital products | 99x</a>
          </CardBody>
        </Card>

        {/* Programming languages card */}
        <Card className="h-2/5 mt-10 ml-10 w-5/6" variant='outline'>
          <CardBody>
            <Heading>Skills</Heading><br/>
            <Flex wrap='wrap'>
              {/* Display programming languages as buttons */}
              {languages.map((language, index) => (
                <Button key={index} m='1' variant='outline' colorScheme='blue'>
                  {language}
                </Button>
              ))}
            </Flex>
          
            <div className="mt-20">
              <Button w={'full'} variant='solid' colorScheme='red'>
                Deactivate
              </Button>
            </div>
            <div className="mt-20">
              <Button w={'full'} variant='solid' colorScheme='blue'>
                Log Out
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Flex>
  );
}

export default ProfileEditPage;
