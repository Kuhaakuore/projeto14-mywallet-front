import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import { styled } from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
          </Routes>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #8c11be;
`;