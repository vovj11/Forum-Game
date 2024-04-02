import React from 'react';
import styled from 'styled-components';

const ConstructionPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.h1`
  font-size: 3rem;
`;

const SearchPost = () => {
  return (
    <ConstructionPageContainer>
      <Text>Página em construção</Text>
    </ConstructionPageContainer>
  );
};

export default SearchPost;
