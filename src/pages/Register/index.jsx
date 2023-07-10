import { useState } from "react";
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
import LoadingScreen from "../../components/LoadingScreen";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.password.value !== e.target.passwordConfirm.value) {
      alert("Os campos de senha precisam ter o mesmo valor!");
      return;
    }
    delete formData.passwordConfirm;
    setIsLoading(true);
    const promise = api.signUp({
      ...formData,
    });

    promise.then(() => {
      setIsLoading(false);
      navigate("/");
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
          type="text"
          placeholder="Nome"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
          autoComplete="true"
          data-test="name"
        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
          autoComplete="true"
          data-test="email"
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
          autoComplete="true"
          minLength={3}
          data-test="password"
        />

        <Input
          type="password"
          placeholder="Confirme sua senha"
          name="passwordConfirm"
          onChange={handleChange}
          value={formData.passwordConfirm}
          required
          autoComplete="true"
          minLength={3}
          data-test="conf-password"
        />

        <Button type="submit" data-test="sign-up-submit">
          Cadastrar
        </Button>
      </Form>

      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Container>
  );
}
