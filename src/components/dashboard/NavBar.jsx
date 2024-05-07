import logo from "../../assets/Devinsight.png"
import { Avatar, AvatarBadge, Wrap, WrapItem, Button, Text } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Link, useLocation } from "react-router-dom";
import {RxDividerVertical} from "react-icons/rx";

export default function NavBar() {
    const location = useLocation();

    return (
        <>
            <div className="flex flex-row items-center justify-between bg-white text-black text-xl border-2 border-solid">
                <div>
                    <a href="/public">
                        <img className="pl-4 h-10 w-aut0" src={logo} alt="Logo" />
                    </a>
                </div>
                <div className="flex items-center  p-5">
                    <Link to="/db">
                        <Button colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Dashboard</Button>
                    </Link>
                    <RxDividerVertical className="ml-1 mr-1"/>
                    <Link to="/cs">
                        <Button colorScheme={location.pathname === '/cs' ? 'blue' : 'gray'}>Submissions</Button>
                    </Link>
                    <RxDividerVertical className="ml-1 mr-1"/>
                    <Link to="/cu">
                        <Button colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Help Desk</Button>
                    </Link>
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
