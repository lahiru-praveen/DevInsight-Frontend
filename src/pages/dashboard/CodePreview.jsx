import {Tabs, TabList, TabPanels, Tab, TabPanel, Button} from '@chakra-ui/react'

export default function CodePreview() {
    return (
        <div className="flex flex-col h-[100vh]">
            <div className="h-[10vh] bg-yellow-500 ">
                <h1>Heading component</h1>
            </div>

            <div className="flex flex-row h-[90vh]">
                <div className="basis-1/6 bg-blue-600">
                    <h1>Navigation Bar component</h1>
                </div>

                <div className="basis-5/6 p-4 flex flex-col bg-[#EBEBEB] m-3">
                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Preview</Tab>
                            <Tab isDisabled _selected={{ color: 'white', bg: 'blue.500' }}>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div className="flex flex-row justify-end">
                                    <Button border='2px' size="md" borderColor='blue.500'
                                            textColor='white' className="w-[281px] !bg-blue-500">
                                        Start Review
                                    </Button>
                                </div>

                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

