import React, { useState } from 'react';
import styled from 'styled-components';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Logo from './assets/vf.svg';
import Drawer from './Drawer';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';

const HeaderContainer = styled.header`
  background-color: #2c2040;
  height: 64px;
  padding: 0 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const LogoImg = styled.img`
  height: 48px;
  width: 48px;
`;

const Title = styled.div`
  color: #d8bfd8;
  font-size: 1.5rem;
  margin-left: 8px;
`;

const LeftSection = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  color: #d8bfd8;
  margin-left: 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #b76fd9;
  }
  @media screen and (max-width: 959px) {
    display: none;
  }
`;

const ProfileIcon = styled.div`
  color: #d8bfd8;
  margin-left: 24px;
  cursor: pointer;
  font-size: 2rem;
  transition: color 0.3s;

  &:hover {
    color: #b76fd9;
  }
`;

const Header = ({ setCurrentPage }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSignup = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser]);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log('Login bem-sucedido!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection onClick={() => setCurrentPage('Posts')}>
          <LogoImg src={Logo} />
          <Title>Vital Fórum</Title>
        </LeftSection>
        <RightSection>
          {!isLoggedIn && (
            <>
              <MenuItem onClick={openLoginPopup}>Login</MenuItem>
              <MenuItem onClick={openSignupPopup}>Cadastre-se</MenuItem>
            </>
          )}
          {isLoggedIn && (
            <ProfileIcon onClick={toggleDrawer}>
              <IoPersonCircleOutline />
            </ProfileIcon>
          )}
        </RightSection>
      </HeaderContainer>
      <Drawer
        setCurrentPage={setCurrentPage}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
      {showLoginPopup && (
        <LoginPopup
          onClose={closeLoginPopup}
          registeredUsers={registeredUsers}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showSignupPopup && (
        <SignupPopup onClose={closeSignupPopup} onSignup={handleSignup} />
      )}
    </>
  );
};

export default Header;
