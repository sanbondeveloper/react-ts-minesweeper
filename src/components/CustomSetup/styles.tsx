import styled from 'styled-components';

export const TitleWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  h1 {
    font-size: 25px;
    font-weight: 700;
    margin-right: 20px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 5px 0;

  label {
    flex: 1;
  }

  input {
    width: 50px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
