import React, { useState } from 'react';
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
  color: 6a5acd;
  font-weight: bold;
  margin-bottom: 8px;
  vertical-align: top;
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

const NewPost = ({ user, AttPage }) => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [like, setLike] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const UrlDataBase =
    'https://forum-gamificado-postdata-default-rtdb.firebaseio.com/';

  console.log('userNewPost:', user);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('user:', user);

    if (!user || !user.name) {
      console.error('Usuário não está logado ou nome não está definido.');
      return;
    }

    const keyWords = keyWord
      .split(',')
      .map((kw) => kw.trim())
      .filter((kw) => kw !== '');

    const postData = {
      topic,
      message,
      keyWords,
      publicationDate: formatDate(new Date()),
      creator: user.name,
      like,
      dislikes,
    };

    fetch(`${UrlDataBase}/PostsData.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Novo Post Criado:', data);
        setTopic('');
        setMessage('');
        setKeyWord('');
        if (AttPage) {
          AttPage();
        }
      })
      .catch((error) => {
        console.error('Erro ao criar o post:', error);
      });
    console.log('Novo post criado:', { topic, message, keyWord });

    setTopic('');
    setMessage('');
    setKeyWord('');
  };

  return (
    <Container>
      <Title>Crie seu post</Title>
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
        <Button type="submit">Publicar</Button>
      </Form>
    </Container>
  );
};

export default NewPost;
