import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import FileList from "../../components/dashboard/FileList.jsx"; // Import the stylesheet for the syntax highlighting theme
//import {useState} from "react";

export default function CodePreview() {
    // Initialize highlight.js
    hljs.configure({ useBR: true }); // Configure highlight.js to recognize line breaks

    // Highlight the code snippet with automatic language detection
    const codeSnippet = `import java.util.Scanner;
        
        public class Main {
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                System.out.print("Enter the number of elements: ");
                int n = scanner.nextInt();
                
                int[] arr = new int[n];
                System.out.println("Enter the elements:");
                for (int i = 0; i < n; i++) {
                    arr[i] = scanner.nextInt();
                }
                
                System.out.println("The elements entered are:");
                for (int i = 0; i < n; i++) {
                    System.out.print(arr[i] + " ");
                }
                System.out.println();
                
                int sum = 0;
                for (int i = 0; i < n; i++) {
                    sum += arr[i];
                }
                System.out.println("The sum of the elements is: " + sum);
                
                System.out.println("Printing a pattern:");
                for (int i = 1; i <= n; i++) {
                    for (int j = 1; j <= i; j++) {
                        System.out.print(j + " ");
                    }
                    System.out.println();
                }
                
                System.out.println("Calculating factorial:");
                int factorial = 1;
                for (int i = 1; i <= n; i++) {
                    factorial *= i;
                }
                System.out.println("Factorial of " + n + " is: " + factorial);
                
                System.out.println("Checking for prime numbers:");
                for (int i = 2; i <= n; i++) {
                    boolean isPrime = true;
                    for (int j = 2; j <= Math.sqrt(i); j++) {
                        if (i % j == 0) {
                            isPrime = false;
                            break;
                        }
                    }
                    if (isPrime) {
                        System.out.print(i + " ");
                    }
                }
                System.out.println();
                
                System.out.println("Printing Fibonacci series:");
                int fib1 = 0, fib2 = 1;
                for (int i = 0; i < n; i++) {
                    System.out.print(fib1 + " ");
                    int nextFib = fib1 + fib2;
                    fib1 = fib2;
                    fib2 = nextFib;
                }
                System.out.println();
            }
        }`;

    const highlightedCode = hljs.highlightAuto(codeSnippet).value;

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-yellow-500">
                <h1>Heading component</h1><br/>
            </div>

            <div className="flex flex-row h-auto">
                <div className="w-1/6">
                    <FileList/>
                </div>

                <div className="w-5/6 p-4 flex flex-col bg-[#EBEBEB] m-3 h-auto">
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em">
                            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Preview</Tab>
                            <Tab isDisabled _selected={{ color: 'white', bg: 'blue.500' }}>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div className="flex flex-row justify-end mb-3">
                                    <Button border="2px" size="md" borderColor="blue.500" textColor="white"
                                            className="w-[150px] !bg-blue-500">
                                        Start Review
                                    </Button>
                                </div>
                                <pre>
                                    <code className="hljs" dangerouslySetInnerHTML={{__html: highlightedCode}}/>
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
