import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import { styled } from "styled-components";

function App() {
  return (
    <>
    <Container>
    <Routes>
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </Container>
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
