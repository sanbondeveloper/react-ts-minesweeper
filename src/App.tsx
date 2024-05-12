import styled from 'styled-components';

import { useLevelDataFromLocalStorage } from './hooks/useLevelDataFromLocalStorage';
import Menu from './components/Menu';
import Board from './components/Board';
import CommonModal from './components/CommonModal';

function App() {
  const load = useLevelDataFromLocalStorage();

  if (!load) return null;

  return (
    <Container>
      <Wrapper>
        <Menu />
        <Board />
      </Wrapper>
      <CommonModal />
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.main`
  background-color: #c0c0c0;
  padding: 5px 20px 20px;
  border-radius: 10px;
`;
