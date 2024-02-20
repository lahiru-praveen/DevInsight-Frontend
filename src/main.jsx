import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import ForgetPassword from "./components/forget-password-com1.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
          {/*<App/>*/}
          <ForgetPassword/>
      </ChakraProvider>

  </React.StrictMode>
)
