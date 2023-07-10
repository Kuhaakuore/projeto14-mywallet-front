import styled from "styled-components";

const Input = styled.input`
  font-size: 20px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  padding: 15px;
  width: 100%;
  &::placeholder {
    color: #000;
  }
`;

export default Input;
