import { FrappeProvider } from 'frappe-react-sdk'
// import { ChakraProvider} from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
// import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
// import { ChakraTheme } from '@chakra-ui/theme'
// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import React, { useState, useRef, useCallback } from "react";

function App() {
  // const navigate = useNavigate()
  // const [count, setCount] = useState(0)
  // const { Button } = ChakraTheme.components

  // const theme = extendBaseTheme({
  //   components: {
  //     Button,
  //   },
  // })

  return (
    <div className="App">
      <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/form2" element={<h2>Formss2</h2>} />
          
        </Routes>
        </BrowserRouter>
      <div>
      <button> Register </button>
      <Box bg="blue.500" color="white" p={4}>
      This is a Box component.</Box>

      <Text mt={2} textAlign="center">
         Box Label
      </Text>
      </div>
      </FrappeProvider>

    </div>
  )
}



export default App
