import React from 'react';
import './css/base/HomePage.css'
const HomePage: React.FC = () => {
  const scrollToNextSection = (): void => {
    const screenHeight: number = window.innerHeight;
    const currentScroll: number = window.scrollY;
    window.scrollTo({
      top: currentScroll + screenHeight,
      behavior: 'smooth',
    });
  };
  
  return (
    <div className='HomePage'>
      <h1 onClick={scrollToNextSection}>Rick and Morty</h1>
    </div>
  );
};

export default HomePage;
