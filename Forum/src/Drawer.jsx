import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoMdHome } from 'react-icons/io';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';

const DrawerContainer = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-256px')};
  width: 256px;
  height: 100%;
  z-index: 30;
  transition: right 0.3s ease;
`;

const DrawerSobreposicao = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: ${({ open }) => (open ? 'block' : 'none')};
  transition: background-color 0.3s ease;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;
  width: 256px;
`;

const DrawerItem = styled.a`
  color: #757575;
  padding: 8px 16px;
  display: flex;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #9400d3;
  }
`;

const DrawerIconDiv = styled.div`
  color: rgba(0, 0, 0, 0.54);
  display: inline-flex;
  min-width: 56px;
  flex-shrink: 0;
  text-align: left;
`;

const DrawerIcon = styled.div`
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
  fill: inherit;
`;

const DrawerTextDiv = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const DrawerText = styled.span`
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

const Drawer = ({ isOpen, onClose, setCurrentPage }) => {
  const drawerRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <>
      <DrawerSobreposicao open={isOpen} />
      <DrawerContainer ref={drawerRef} open={isOpen}>
        <DrawerContent>
          <DrawerItem onClick={() => setCurrentPage('Posts')}>
            <DrawerIconDiv>
              <DrawerIcon>
                <IoMdHome />
              </DrawerIcon>
            </DrawerIconDiv>
            <DrawerTextDiv>
              <DrawerText>Home</DrawerText>
            </DrawerTextDiv>
          </DrawerItem>
          <DrawerItem onClick={() => setCurrentPage('PerfilAccess')}>
            <DrawerIconDiv>
              <DrawerIcon>
                <IoPersonCircleOutline />
              </DrawerIcon>
            </DrawerIconDiv>
            <DrawerTextDiv>
              <DrawerText>Acessar Perfil</DrawerText>
            </DrawerTextDiv>
          </DrawerItem>
          <DrawerItem onClick={() => setCurrentPage('NewPost')}>
            <DrawerIconDiv>
              <DrawerIcon>
                <MdPostAdd />
              </DrawerIcon>
            </DrawerIconDiv>
            <DrawerTextDiv>
              <DrawerText>Nova Publicação</DrawerText>
            </DrawerTextDiv>
          </DrawerItem>
          <DrawerItem onClick={() => setCurrentPage('SearchPost')}>
            <DrawerIconDiv>
              <DrawerIcon>
                <FaSearch />
              </DrawerIcon>
            </DrawerIconDiv>
            <DrawerTextDiv>
              <DrawerText>Pesquisar Publicação</DrawerText>
            </DrawerTextDiv>
          </DrawerItem>
          <DrawerItem onClick={onClose}>
            <DrawerIconDiv>
              <DrawerIcon>
                <ImExit />
              </DrawerIcon>
            </DrawerIconDiv>
            <DrawerTextDiv>
              <DrawerText>Sair</DrawerText>
            </DrawerTextDiv>
          </DrawerItem>
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Drawer;
