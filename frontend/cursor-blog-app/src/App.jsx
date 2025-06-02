import React from 'react';
import { useState } from 'react';
import MainContainer from './MainContainer.jsx';
import Header from './Header.jsx';

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
      <Header />
      <MainContainer/>
    </>
  );
}

export default App
