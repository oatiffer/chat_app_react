import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme';
import './theme/styles.css';
import ChatApp from './components/chatapp/ChatApp.js';
import Login from './components/pages/Login.js';
import Register from './components/pages/Register.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
