import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Posts from './Posts';
import PerfilAccess from './PerfilAccess';
import NewPost from './NewPost';
import SearchPost from './SearchPost';

function App() {
  const [currentPage, setCurrentPage] = useState('Posts');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    console.log('Dados do usuário recebidos:', user);
    setLoggedInUser(user);
    console.log('Login bem-sucedido!');
    console.log('loggedInUserHeader após login:', loggedInUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Posts':
        return <Posts />;
      case 'PerfilAccess':
        return <PerfilAccess user={loggedInUser} />;
      case 'NewPost':
        return (
          <NewPost
            user={loggedInUser}
            AttPage={() => setCurrentPage('Posts')}
          />
        );
      case 'SearchPost':
        return <SearchPost />;
      default:
        return <Posts />;
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
