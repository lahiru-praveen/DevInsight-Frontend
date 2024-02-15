'use client'

import { ChakraProvider } from "@chakra-ui/react";
import ForgetPasswordVerify from "../../(loging-components)/FogetPassword2";


export default function FogetPasswordVerifyLayout({ children2 }) {
  return (
        <ChakraProvider>
            {/* <div>
                <ForgetPasswordVerify/>
            </div> */}
            {children2}
        </ChakraProvider>
  );
}