import React from 'react';
import { Select } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, InputRightAddon} from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from '@chakra-ui/react'
import  pp  from '../../assets/pp.jpeg';

const MyComponent = () => {
  return (
    <div className='px-20 py-5 '>
        <h1 class="py-5 text-xl leading-tight font-bold text-gray-500">
            Staff
        </h1>
        <div className='flex flex-row space-x-5 py-5'>
            <div class='basis-1/4'>
            <Select placeholder='Select option'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
            </Select>
            </div>

            <div class='basis-2/4'>
            <InputGroup>
            <InputLeftElement children={<Search2Icon color="gray.600"/>} />
            <Input
                placeholder="Search..."
                />
            {/* <InputRightAddon>
            <Button borderLeftRadius={0} borderRightRadius={3.3}>
                Search
            </Button>
            </InputRightAddon>     */}


            </InputGroup>
            </div>
            <div class='basis-1/4'>
            <Button className='w-full' colorScheme='blue'>Search</Button>
            </div>

        </div>
        
    <div class="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   
   <div class="flow-root w">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <Button colorScheme='blue' size='xs'>
                        Edit Role
                    </Button>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <Button colorScheme='blue' size='xs'>
                        Edit Role
                    </Button>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Michael Gough
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <Button colorScheme='blue' size='xs'>
                        Edit Role
                    </Button>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                       <img class="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Lana Byrd
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <Button colorScheme='blue' size='xs'>
                        Edit Role
                    </Button>
                </div>
            </li>
            <li class="pt-3 pb-0 sm:pt-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Thomes Lean
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <Button colorScheme='blue' size='xs'>
                        Edit Role
                    </Button>
                </div>
            </li>
        </ul>
   </div>
</div>
</div>

  );
};

export default MyComponent;