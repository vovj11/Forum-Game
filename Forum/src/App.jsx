import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Posts from './Posts';
import PerfilAccess from './PerfilAccess';
import NewPost from './NewPost';
import SearchPost from './SearchPost';
import EditPost from './EditPost';

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

  const renderPage = () => {
    switch (currentPage) {
      case 'Posts':
        return <Posts postsData={postsData} />;
      case 'PerfilAccess':
        return (
          <PerfilAccess
            user={loggedInUser}
            posts={postsData}
            fetchPosts={fetchPosts}
            setCurrentPage={setCurrentPage}
            editPostHandler={editPostHandler}
          />
        );
      case 'NewPost':
        return (
          <NewPost
            user={loggedInUser}
            AttPage={() => setCurrentPage('Posts')}
          />
        );
      case 'SearchPost':
        return <SearchPost />;
      case 'EditPost':
        return (
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
        );
      default:
        return <Posts postsData={postsData} />;
    }
  };

  return (
    <main>
      <Header
        setCurrentPage={setCurrentPage}
        isLoggedIn={handleLoginSuccess}
        user={loggedInUser}
      />
      {renderPage()}
    </main>
  );
}

export default App;
