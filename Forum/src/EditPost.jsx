import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  color: #d8bfd8;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border: 1px solid #6a5acd;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #6a5acd;
  font-weight: bold;
  margin-bottom: 8px;
  align-self: flex-start;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #6a5acd;
  border-radius: 4px;
  margin-bottom: 16px;
  width: calc(100% - 20px);
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #6a5acd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 16px;
  width: calc(100% - 20px);
  height: 200px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #9400d3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a5acd;
  }
`;

const EditPost = ({ postId, postData, onUpdate }) => {
  const [topic, setTopic] = useState(postData?.topic || '');
  const [message, setMessage] = useState(postData?.message || '');
  const [keyWord, setKeyWord] = useState(
    postData?.keyWords ? postData.keyWords.join(', ') : '',
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const keyWords = keyWord
      .split(',')
      .map((kw) => kw.trim())
      .filter((kw) => kw !== '');

    const updatedPostData = {
      topic,
      message,
      keyWords,
    };

    onUpdate(postId, updatedPostData);
  };

  return (
    <Container>
      <Title>Editar Post</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="topic">Tópico:</Label>
          <Input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Mensagem:</Label>
          <TextArea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="keyWord">Palavras-Chave:</Label>
          <Input
            type="text"
            id="keyWord"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default EditPost;
