import React from 'react';
import { useState } from 'react';
import styles from './App.module.css';
import MainContainer from './MainContainer.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
      <Header />
      <MainContainer />
      <div className={styles["main-container"]}>
        <Footer />
      </div>
    </>
  );
}

export default App
