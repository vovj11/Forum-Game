import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditPost from './EditPost';

const UserInfoContainer = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #3c3c3c;
`;

const UserInfoHeading = styled.h2`
  color: #6a5acd;
  margin-bottom: 8px;
`;

const UserInfoItem = styled.p`
  margin-bottom: 4px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #6a5acd;
  color: white;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
    color: #000;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const EditButton = styled.div`
  background-color: #6a5acd;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #9400d3;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e83f33;
  }
`;

const PerfilAccess = ({ user, posts, fetchPosts, editPostHandler }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostData, setEditPostData] = useState(null);
  const UrlDataBase =
    'https://forum-gamificado-postdata-default-rtdb.firebaseio.com/';

  useEffect(() => {
    setUserPosts(posts.filter((post) => post.creator === user.name));
  }, [user, posts]);

  const handleDelete = async (postId) => {
    const confirmation = window.confirm(
      'Você tem certeza que deseja excluir este post?',
    );

    if (confirmation) {
      try {
        await fetch(`${UrlDataBase}/PostsData/${postId}.json`, {
          method: 'DELETE',
        });
        fetchPosts();
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
      }
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = userPosts.find((post) => post.id === postId);
    if (postToEdit) {
      setEditingPostId(postId);
      setEditPostData(postToEdit);
      setCurrentPage('EditPost');
    }
  };

  return (
    <>
      <UserInfoContainer>
        <UserInfoHeading>Dados do Usuário</UserInfoHeading>
        <UserInfoItem>
          <strong>Nome:</strong> {user.name}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Email:</strong> {user.email}
        </UserInfoItem>
        <UserInfoItem>
          <strong>Pontuação:</strong> {user.score}
        </UserInfoItem>
      </UserInfoContainer>

      <div>
        <h2>Posts do Usuário</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Número de Curtidas</TableCell>
                <TableCell>Número de Descurtidas</TableCell>
                <TableCell>Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.topic}</TableCell>
                  <TableCell>{post.like}</TableCell>
                  <TableCell>{post.dislikes}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <EditButton onClick={() => editPostHandler(post.id)}>
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(post.id)}>
                        Excluir
                      </DeleteButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default PerfilAccess;
