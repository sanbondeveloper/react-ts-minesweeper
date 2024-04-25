import styled from 'styled-components';

import Menu from './components/Menu';
import CustomSetupModal from './components/CustomSetupModal';
import Board from './components/Board';

function App() {
  return (
    <Container>
      <Wrapper>
        <Menu />
        <Board />
      </Wrapper>
      <CustomSetupModal />
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
