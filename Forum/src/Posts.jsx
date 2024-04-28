import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  margin-top: 64px;

  @media screen and (max-width: 959px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PostContainer = styled.div`
  border: 1px solid #6a5acd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Topic = styled.h3`
  color: #d8bfd8;
`;

const Message = styled.p`
  color: #888;
`;

const Creator = styled.p`
  color: #888;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Button = styled.button`
  background-color: #9400d3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  margin-right: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a5acd;
  }
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const UrlDataBase =
    'https://forum-gamificado-postdata-default-rtdb.firebaseio.com/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${UrlDataBase}/PostsData.json`);
        const data = await response.json();

        if (data) {
          const topico = Object.values(data);
          setPosts(topico);
        }
      } catch (error) {
        console.error('Erro ao buscar os tópicos:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const handleDislike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post,
      ),
    );
  };

  return (
    <PostsContainer>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <Topic>{post.topic}</Topic>
          <Message>{post.message}</Message>
          <Creator>Criado por: {post.creator}</Creator>
          <ActionsContainer>
            <Button onClick={() => handleLike(post.id)}>
              Curtir ({post.likes})
            </Button>
            <Button onClick={() => handleDislike(post.id)}>
              Descurtir ({post.dislikes})
            </Button>
          </ActionsContainer>
        </PostContainer>
      ))}
    </PostsContainer>
  );
};

export default Posts;
