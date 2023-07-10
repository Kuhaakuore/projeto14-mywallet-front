import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import { styled } from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTransaction from "./pages/CreateTransaction";
import EditRegistry from "./pages/EditRegistry";
import { RegistryProvider } from "./contexts/RegistryContext";

function App() {
  return (
    <>
      <AuthProvider>
        <RegistryProvider>
          <PageContainer>
            <ContentContainer>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/nova-transacao/:tipo"
                  element={<CreateTransaction />}
                />
                <Route
                  path="/editar-registro/:tipo/:id"
                  element={<EditRegistry />}
                />
              </Routes>
            </ContentContainer>
          </PageContainer>
        </RegistryProvider>
      </AuthProvider>
    </>
  );
}

export default App;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #8c11be;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 375px;
`;
