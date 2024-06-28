import PropTypes from "prop-types";
import logo from "../../assets/Devinsight.png";
import {
    Avatar,
    Wrap,
    WrapItem,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Tabs,
    TabList,
    Tab,
    Box
} from '@chakra-ui/react';
import { AvatarBadge } from '@chakra-ui/react';
import { Link, useLocation } from "react-router-dom";

export default function NavBarUser({ button1, button2, button3, button4 }) {
    const location = useLocation();

    const tabIndex = () => {
        switch (location.pathname) {
            case '/db':
                return 0;
            case '/cs':
                return 1;
            case '/uhr':
                return 2;
            case '/cu':
                return 3;
            default:
                return -1;
        }
    };

    return (
        <>
            <div className="flex flex-row items-center px-4 justify-between bg-white text-black text-xl border-2 border-solid">
                <div className='flex items-center mb-4  md:mb-0'>
                    <img src={logo} className="w-24 h-auto md:w-32 md:h-auto" alt="Pic" />
                </div>

                <div className="flex items-center p-5">
                    <Tabs index={tabIndex()} variant="soft-rounded" colorScheme='blue'>
                        <TabList>
                            <Tab as={Link} to="/db" isDisabled={button1} colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Dashboard</Tab>
                            <Tab as={Link} to="/cs" isDisabled={button2} colorScheme={location.pathname === '/cs' ? 'blue' : 'gray'}>Submissions</Tab>
                            <Tab as={Link} to="/uhr" isDisabled={button3} colorScheme={location.pathname === '/uhr' ? 'blue' : 'gray'}>Help Requests</Tab>
                            <Tab as={Link} to="/cu" isDisabled={button4} colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Help</Tab>
                        </TabList>
                    </Tabs>
                </div>

                <div className="flex flex-row">
                    <div className="flex-col">
                        <Box textAlign="right" mr={3}>
                            <Text fontWeight="bold" color="black">
                                Lahiru Praveen
                            </Text>
                            <Text fontSize="sm" color="gray.300">
                                99X
                            </Text>
                        </Box>
                    </div>
                    <div>
                        <Menu>
                            <MenuButton>
                                <Wrap>
                                    <WrapItem className="mr-2">
                                        <Avatar size="md" name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                        </Avatar>
                                    </WrapItem>
                                </Wrap>
                            </MenuButton>
                            <MenuList>
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
    );
}

NavBarUser.propTypes = {
    button1: PropTypes.bool,
    button2: PropTypes.bool,
    button3: PropTypes.bool,
    button4: PropTypes.bool,
};

NavBarUser.defaultProps = {
    button1: false,
    button2: false,
    button3: false,
    button4: false,
};
