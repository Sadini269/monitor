import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import Header from './header/Header';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Header/>
        <Dashboard/>
      </ChakraProvider>
    </div>
  );
}

export default App;
