import logo from "../../assets/Devinsight.png"
import { Avatar, AvatarBadge, Wrap, WrapItem, Button, Text } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Link, useLocation } from "react-router-dom";
import {RxDividerVertical} from "react-icons/rx";
import PropTypes from "prop-types";

export default function NavBarUser({ button1, button2, button3, button4 }) {
    const location = useLocation();

    return (
        <>
            <div className="flex flex-row items-center justify-between bg-white text-black text-xl border-2 border-solid">
                <div>
                    <a href="/db">
                        <img className="pl-4 h-10 w-aut0" src={logo} alt="Logo" />
                    </a>
                </div>
                <div className="flex items-center  p-5">
                    <Link to="/db">
                        <Button isDisabled={button1} colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Dashboard</Button>
                    </Link>
                    <RxDividerVertical className="ml-1 mr-1"/>
                    <Link to="/cs">
                        <Button isDisabled={button2} colorScheme={location.pathname === '/cs' ? 'blue' : 'gray'}>Submissions</Button>
                    </Link>
                    <RxDividerVertical className="ml-1 mr-1"/>
                    <Link to="/uhr">
                        <Button isDisabled={button3} colorScheme={location.pathname === '/uhr' ? 'blue' : 'gray'}>Help Requests</Button>
                    </Link>
                    <RxDividerVertical className="ml-1 mr-1"/>
                    <Link to="/cu">
                        <Button isDisabled={button4} colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Help</Button>
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
                                {/* <MenuItem as='a' href='#'>Profile</MenuItem> */}
                                <MenuItem as={Link} to="/ep">Profile</MenuItem>
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

NavBarUser.propTypes = {
    button1: PropTypes.bool.isRequired,
    button2: PropTypes.bool.isRequired,
    button3: PropTypes.bool.isRequired,
    button4: PropTypes.bool.isRequired,
};
