
// import React, { useState } from 'react';
// import {
//     Button,
//     FormControl,
//     Flex,
//     Heading,
//     Input,
//     Stack,
//     Text,
//     useColorModeValue,
// } from '@chakra-ui/react';

// export default function EditProfile() {
//     return (
//                 <div class="flex">
                   
//                 <div class="w-1/2 bg-gray-200 p-4">
//                  </div>
                
//                 <div class="w-1/2 bg-gray-300 p-4"></div>
//                 </div>
//     );
// }

import React from 'react';

function ProfileEditPage() {
  return (
    <div className="flex">

      <div className="w-1/2 h-screen border-r bg-gray-200 rounded-lg m-4">
        Left Column
      </div>
      
      <div className="w-1/2 m-4">
            {/* Right Upper Column */}
            <div className="h-2/5 bg-gray-200 rounded-lg mb-8">
                hello
            </div>
            {/* Right Bottom Column */}
            <div className="h-2/5 bg-gray-200 rounded-lg">
                User Qualifications
            </div>
      </div>

    </div>
  );
}

export default ProfileEditPage;
