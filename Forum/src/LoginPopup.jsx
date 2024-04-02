import React, { useState } from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.div`
  color: #8a2be2;
  font-size: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #8a2be2;
  align-self: flex-start;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: white;

  &:hover {
    background-color: #6a5acd;
  }
`;

const LeftButton = styled(Button)`
  background-color: #9400d3;
`;

const RightButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #ff5000;
  }
`;

const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginPopup = ({ onClose, registeredUsers, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      alert('Login bem-sucedido!');
      onLoginSuccess(user);
      onClose();
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <PopupContainer>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormButtons>
          <LeftButton primary type="submit">
            Login
          </LeftButton>
          <RightButton onClick={onClose} primary>
            Fechar
          </RightButton>
        </FormButtons>
      </Form>
    </PopupContainer>
  );
};

export default LoginPopup;
