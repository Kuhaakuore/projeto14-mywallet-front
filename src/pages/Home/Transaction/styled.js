import { styled } from "styled-components";

const TransactionContainer = styled.div`
  display: flex;
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  justify-content: space-between;
  margin-bottom: 20px;
  div {
    display: flex;
  }
  p {
    color: #c6c6c6;
  }
  span {
    padding-left: 7px;
    color: #000;
  }
`;

const Value = styled.div`
  color: ${(props) => (props.type === "entrada" ? "#03AC00" : "#C70000")};
`;

export { TransactionContainer, Value }
