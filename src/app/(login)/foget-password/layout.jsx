'use client'

import { ChakraProvider } from "@chakra-ui/react";
import ForgetPassword1 from "../(loging-components)/FogetPassword1";

export default function FogetPasswordLayout({ children }) {
  return (
    <ChakraProvider>
      <div>
        <ForgetPassword1/>
      </div>
    </ChakraProvider>
    //{children}
  );
}