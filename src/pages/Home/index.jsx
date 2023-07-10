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

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   const [isLoading, setIsLoading] = useState(false);
  const { auth, login } = useAuth();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // setIsLoading(true);
    const promise = api.login({
      ...formData,
    });

    promise.then((res) => {
      //   setIsLoading(false);
      login(res.data);
      navigate("/home");
    });
    promise.catch((res) => {
      //   setIsLoading(false);
      alert(res.response.data.message);
    });
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
          //   disabled={isLoading}
          
          autoComplete="true"
          data-test="email"
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          //   disabled={isLoading}
          
          autoComplete="true"
          data-test="password"
        />

        <Button
          type="submit"
          // disabled={isLoading}
          data-test="sign-in-submit"
        >
          {/* {isLoading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
          ) : (
            "Cadastrar"
          )} */}
          Entrar
        </Button>
      </Form>

      <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}
