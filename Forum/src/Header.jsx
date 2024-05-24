import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Logo from './assets/vf.svg';
import Drawer from './Drawer';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import NewPost from './NewPost';
import { useNavigate } from 'react-router-dom';

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

const Header = ({ currentPage, setCurrentPage, isLoggedIn, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

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

  const handleUserChange = (user) => {
    setLoggedInUser(user);
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection onClick={() => navigate('/')}>
          <LogoImg src={Logo} />
          <Title>Vital Fórum</Title>
        </LeftSection>
        <RightSection>
          {!user && (
            <>
              <MenuItem onClick={openLoginPopup}>Login</MenuItem>
              <MenuItem onClick={openSignupPopup}>Cadastre-se</MenuItem>
            </>
          )}
          {user && (
            <ProfileIcon onClick={toggleDrawer}>
              <IoPersonCircleOutline />
            </ProfileIcon>
          )}
        </RightSection>
      </HeaderContainer>
      <Drawer
        setCurrentPage={setCurrentPage}
        handleUserChange={handleUserChange}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
      {showLoginPopup && (
        <LoginPopup
          onClose={closeLoginPopup}
          registeredUsers={registeredUsers}
          onLoginSuccess={isLoggedIn}
        />
      )}
      {showSignupPopup && (
        <SignupPopup onClose={closeSignupPopup} onSignup={handleSignup} />
      )}

      {isLoggedIn && currentPage === 'NewPost' && (
        <NewPost currentPage={currentPage} loggedInUser={loggedInUser} />
      )}
    </>
  );
};

export default Header;
