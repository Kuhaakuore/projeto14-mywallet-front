import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;

  h1 {
    color: #fff;
    font-family: Raleway;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  svg {
    cursor: pointer;
  }
`;

const MessageContainer = styled.div`
  border-radius: 5px;
  background: #fff;
  margin-bottom: 13px;
  padding: 11px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 230px);
  max-height: 446px;
  justify-content: center;

  p {
    color: #868686;
    text-align: center;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ContentContainer = styled.div`
  border-radius: 5px;
  background: #fff;
  margin-bottom: 13px;
  padding: 23px 11px 10px 11px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 230px);
  max-height: 446px;
  justify-content: space-between;
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: Raleway;
  
  span {
    color: ${(props) => props.color};
    font-weight: 400;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #a328d6;
  width: 155px;
  height: 114px;
  padding: 9px;
  justify-content: space-between;

  p {
    color: #fff;
    font-family: Raleway;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const StyledLink = styled(Link)`
  width: 25px;
`;

export {
  Container,
  Header,
  ContentContainer,
  TransactionsContainer,
  BalanceContainer,
  Footer,
  ButtonContainer,
  MessageContainer,
  StyledLink
};
