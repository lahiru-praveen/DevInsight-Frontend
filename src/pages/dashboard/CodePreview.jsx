import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Import the stylesheet for the syntax highlighting theme

export default function CodePreview() {
    // Initialize highlight.js
    hljs.configure({ useBR: true }); // Configure highlight.js to recognize line breaks

    // Highlight the code snippet
    const highlightedCode = hljs.highlight(
        `/* Reset default browser styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Set body styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }

        /* Header styles */
        header {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
        }

        /* Navigation styles */
        nav {
            background-color: #444;
            padding: 10px;
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin-right: 10px;
        }

        nav ul li a {
            color: #fff;
            text-decoration: none;
        }

        /* Main content styles */
        .main-content {
            padding: 20px;
        }

        /* Footer styles */
        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
        }`,
        { language: 'css' }
    ).value;

    return (
        <div className="flex flex-col h-screen">
            <div className="h-1/10 bg-yellow-500">
                <h1>Heading component</h1>
            </div>

            <div className="flex flex-row h-9/10">
                <div className="w-1/6 bg-blue-600">
                    <h1>Navigation Bar component</h1>
                </div>

                <div className="w-5/6 p-4 flex flex-col bg-[#EBEBEB] m-3">
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em">
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Preview</Tab>
                            <Tab isDisabled _selected={{ color: 'white', bg: 'blue.500' }}>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div className="flex flex-row justify-end mb-3">
                                    <Button border="2px" size="md" borderColor="blue.500" textColor="white"
                                            className="w-[281px] !bg-blue-500">
                                        Start Review
                                    </Button>
                                </div>
                                <pre>
                                        <code className="hljs language-css"
                                              dangerouslySetInnerHTML={{__html: highlightedCode}}/>
                                </pre>
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
