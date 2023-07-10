import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import api from "../../services/api";
import {
  Container,
  Form,
  Input,
  Button,
  StyledLink,
} from "../../components/FormComponents";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { auth, login } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    const promise = api.login({
      ...formData,
    });

    promise.then((res) => {
      setIsLoading(false);
      login(res.data);
      navigate("/home");
    });
    promise.catch((res) => {
      setIsLoading(false);
      alert(res.response.data.message);
    });
  }

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <Container>
      <img alt="logo.svg" src={Logo} />

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          value={formData.email}
          autoComplete="true"
          data-test="email"
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          autoComplete="true"
          data-test="password"
        />

        <Button type="submit" data-test="sign-in-submit">
          Entrar
        </Button>
      </Form>

      <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}
