import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Posts from './Posts';
import PerfilAccess from './PerfilAccess';
import NewPost from './NewPost';
import SearchPost from './SearchPost';

function App() {
  const [currentPage, setCurrentPage] = useState('Posts');

  const renderPage = () => {
    switch (currentPage) {
      case 'Posts':
        return <Posts />;
      case 'PerfilAccess':
        return <PerfilAccess />;
      case 'NewPost':
        return <NewPost />;
      case 'SearchPost':
        return <SearchPost />;
      default:
        return <Posts />;
    }
  };

  return (
    <main>
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
    </main>
  );
}

export default App;
