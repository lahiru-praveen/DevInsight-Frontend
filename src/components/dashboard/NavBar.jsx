import logo from "../../assets/Devinsight.png"
import { Avatar, AvatarBadge, Wrap, WrapItem, Button, } from '@chakra-ui/react'
import {Menu, MenuButton, MenuList, MenuItem, Text, MenuDivider,} from '@chakra-ui/react'

export default function NavBar() {

    return (
        <>
            <div className="flex flex-row items-center justify-between bg-white text-black text-xl border-2 border-solid">
                <div>
                    <a href="/public">
                        <img className="pl-4 h-10 w-aut0" src={logo} alt="Logo"/>
                    </a>
                </div>
                <div className="flex items-center  p-5">
                    <Button colorScheme='blue'>
                        Dashboard
                    </Button>
                    <Button className="text-gray-700" variant='ghost'>
                        Submissions
                    </Button>
                    <Button className="text-gray-700" variant='ghost'>
                        Help Desk
                    </Button>
                </div>
                <div className="flex flex-row">
                    <div className="flex-col">
                        <div>
                            <Text>Lahiru Praveen</Text>
                        </div>
                        <div>
                            <Text>99X</Text>
                        </div>
                    </div>
                    <div>
                        <Menu>
                            <MenuButton>
                                <Wrap>
                                    <WrapItem className="mr-2">
                                        <Avatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                        </Avatar>
                                    </WrapItem>
                                </Wrap>
                            </MenuButton>
                            <MenuList>
                                <MenuItem as='a' href='#'>Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem as='a' href='#'>Settings</MenuItem>
                                <MenuDivider />
                                <MenuItem as='a' href='#'>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

