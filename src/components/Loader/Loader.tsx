import React from 'react';
import './css/Loader.css';

const Loader:React.FC = () => {
  return (
    <div className='Loader'>
        <h2>Loading ...</h2>
        <div className="wrapper-line">
            <div className="line"></div>
        </div>
    </div>
  )
}
export default Loader;