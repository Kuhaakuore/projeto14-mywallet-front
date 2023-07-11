import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import {
  BalanceContainer,
  ButtonContainer,
  Container,
  ContentContainer,
  Footer,
  Header,
  MessageContainer,
  StyledLink,
  TransactionsContainer,
} from "./styled";
import Transaction from "../../components/Transaction";
import LoadingScreen from "../../components/LoadingScreen";

export default function Home() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, logout } = useAuth();
  const [userName, setUserName] = useState(undefined);
  const [balance, setBalance] = useState(0);

  function loadTransactions() {
    setIsLoading(true);
    const promise = api.getTransactions(auth);
    promise.then((res) => {
      setIsLoading(false);
      setUserName(res.data.name);
      setTransactions(res.data.transactions.reverse());
      calculateBalance(res.data.transactions);
    });

    promise.catch((res) => {
      setIsLoading(false);
      alert(res.response.data.message);
    });
  }

  function calculateBalance(transactions) {
    if (!transactions) return;
    let result = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "entrada")
        return (result += Number(transaction.value));
      return (result -= Number(transaction.value));
    });
    setBalance(result);
  }

  function handleDeleteRegistry(_id, token) {
    const confirmation = confirm(
      "Tem certeza de que deseja excluir esta transação?"
    );
    if (!confirmation) return;
    setIsLoading(true);
    const promise = api.deleteTransaction(_id, token);
    promise.then(() => {
      setIsLoading(false);
      loadTransactions();
    });
    promise.catch((res) => {
      setIsLoading(false);
      alert(res.response.data.message);
    });
  }

  useEffect(() => {
    if (!auth) {
      navigate("/");
      return;
    }
    loadTransactions();
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <Container>
      <Header>
        <h1 data-test="user-name">Olá, {userName}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          onClick={logout}
          data-test="logout"
        >
          <path
            d="M1.21053 24C0.889475 24 0.581573 23.8736 0.354555 23.6485C0.127537 23.4235 0 23.1183 0 22.8V1.2C0 0.88174 0.127537 0.576515 0.354555 0.351472C0.581573 0.126428 0.889475 0 1.21053 0H18.1579C18.4789 0 18.7868 0.126428 19.0139 0.351472C19.2409 0.576515 19.3684 0.88174 19.3684 1.2V4.8H16.9474V2.4H2.42105V21.6H16.9474V19.2H19.3684V22.8C19.3684 23.1183 19.2409 23.4235 19.0139 23.6485C18.7868 23.8736 18.4789 24 18.1579 24H1.21053ZM16.9474 16.8V13.2H8.47368V10.8H16.9474V7.2L23 12L16.9474 16.8Z"
            fill="white"
          />
        </svg>
      </Header>
      {transactions && transactions.length > 0 ? (
        <ContentContainer>
          <TransactionsContainer>
            {transactions.map((transaction) => {
              return (
                <Transaction
                  key={transaction._id}
                  {...transaction}
                  token={auth}
                  handleDeleteRegistry={handleDeleteRegistry}
                />
              );
            })}
          </TransactionsContainer>
          <BalanceContainer color={balance < 0 ? "#C70000" : "#03AC00"}>
            <div>SALDO</div>
            <div>
              <span data-test="total-amount">
                {Number(Math.abs(balance))
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
              </span>
            </div>
          </BalanceContainer>
        </ContentContainer>
      ) : (
        <MessageContainer>
          <p>
            Não há registros de <br></br> entrada ou saída
          </p>
        </MessageContainer>
      )}
      <Footer>
        <ButtonContainer>
          <StyledLink to={"/nova-transacao/entrada"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              data-test="new-income"
            >
              <path
                d="M16.9922 11.7188H13.2812V8.00781C13.2812 7.90039 13.1934 7.8125 13.0859 7.8125H11.9141C11.8066 7.8125 11.7188 7.90039 11.7188 8.00781V11.7188H8.00781C7.90039 11.7188 7.8125 11.8066 7.8125 11.9141V13.0859C7.8125 13.1934 7.90039 13.2812 8.00781 13.2812H11.7188V16.9922C11.7188 17.0996 11.8066 17.1875 11.9141 17.1875H13.0859C13.1934 17.1875 13.2812 17.0996 13.2812 16.9922V13.2812H16.9922C17.0996 13.2812 17.1875 13.1934 17.1875 13.0859V11.9141C17.1875 11.8066 17.0996 11.7188 16.9922 11.7188Z"
                fill="white"
              />
              <path
                d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM12.5 21.582C7.48535 21.582 3.41797 17.5146 3.41797 12.5C3.41797 7.48535 7.48535 3.41797 12.5 3.41797C17.5146 3.41797 21.582 7.48535 21.582 12.5C21.582 17.5146 17.5146 21.582 12.5 21.582Z"
                fill="white"
              />
            </svg>
          </StyledLink>
          <p>
            Nova <br />
            entrada
          </p>
        </ButtonContainer>
        <ButtonContainer>
          <StyledLink to={"/nova-transacao/saida"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              data-test="new-expense"
            >
              <path
                d="M16.9922 11.7188H8.00781C7.90039 11.7188 7.8125 11.8066 7.8125 11.9141V13.0859C7.8125 13.1934 7.90039 13.2812 8.00781 13.2812H16.9922C17.0996 13.2812 17.1875 13.1934 17.1875 13.0859V11.9141C17.1875 11.8066 17.0996 11.7188 16.9922 11.7188Z"
                fill="white"
              />
              <path
                d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM12.5 21.582C7.48535 21.582 3.41797 17.5146 3.41797 12.5C3.41797 7.48535 7.48535 3.41797 12.5 3.41797C17.5146 3.41797 21.582 7.48535 21.582 12.5C21.582 17.5146 17.5146 21.582 12.5 21.582Z"
                fill="white"
              />
            </svg>
          </StyledLink>
          <p>
            Nova <br />
            saída
          </p>
        </ButtonContainer>
      </Footer>
    </Container>
  );
}
