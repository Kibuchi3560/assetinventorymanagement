import React from 'react';
import './header.css';
import NavigationBar from './NavigationBar';

const Header = () => {
  //const [showDashboard, setShowDashboard] = useState(false);

 
  // eslint-disable-next-line no-unused-vars
//   const toggleDashboard = () => {
//     setShowDashboard(!showDashboard);
//   };

  return (
    
      
    <header className="header bg-primary text-white">
      <div className="container-fluid">
        <div className="header-top d-flex align-items-center justify-content-between py-2">
          <h1 className="header-brand h3 mb-0">shulee</h1>
          <div className="header-search flex-grow-1 mx-3 position-relative">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>
      </div>
      
      <NavigationBar />
    </header>
 
  );
};

export default Header;