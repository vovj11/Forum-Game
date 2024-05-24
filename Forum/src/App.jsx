import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Posts from './Posts';
import PerfilAccess from './PerfilAccess';
import NewPost from './NewPost';
import SearchPost from './SearchPost';
import EditPost from './EditPost';
import LoginRedirect from './LoginRedirect';

function App() {
  const [currentPage, setCurrentPage] = useState('Posts');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  const UrlDataBase =
    'https://forum-gamificado-postdata-default-rtdb.firebaseio.com/';

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  function convertData(data) {
    const ids = Object.keys(data);
    let posts = Object.values(data);
    return posts.map((post, index) => {
      return {
        id: ids[index],
        ...post,
      };
    });
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${UrlDataBase}/PostsData.json`);
      const data = await response.json();
      if (data) {
        const convertedPosts = convertData(data);
        setPostsData(convertedPosts);
      } else {
        setPostsData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os tópicos:', error);
      setPostsData([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const editPostHandler = (postId) => {
    const postToEdit = postsData.find((post) => post.id === postId);
    if (postToEdit) {
      setPostToEdit(postToEdit);
      setCurrentPage('EditPost');
    }
  };

  return (
    <Router>
      <main>
        <Header
          setCurrentPage={setCurrentPage}
          isLoggedIn={handleLoginSuccess}
          user={loggedInUser}
        />
        <Routes>
          <Route path="/" element={<Posts postsData={postsData} />} />{' '}
          <Route
            path="/perfil"
            element={
              <PerfilAccess
                user={loggedInUser}
                posts={postsData}
                fetchPosts={fetchPosts}
                setCurrentPage={setCurrentPage}
                editPostHandler={editPostHandler}
              />
            }
          />
          <Route
            path="/new-post"
            element={
              loggedInUser ? (
                <NewPost
                  user={loggedInUser}
                  AttPage={() => setCurrentPage('Posts')}
                />
              ) : (
                <LoginRedirect />
              )
            }
          />
          <Route path="/search" element={<SearchPost />} />
          <Route
            path="/edit/:postId"
            element={
              <EditPost
                postId={postToEdit?.id}
                postData={postToEdit}
                onUpdate={(postId, updatedData) => {
                  fetch(`${UrlDataBase}/PostsData/${postId}.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                  }).then(() => {
                    fetchPosts();
                    setCurrentPage('Posts');
                  });
                }}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
