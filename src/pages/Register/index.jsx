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

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  //   const [isLoading, setIsLoading] = useState(false);

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
    // setIsLoading(true);
    const promise = api.signUp({
      ...formData,
    });

    promise.then(() => {
      //   setIsLoading(false);
      navigate("/");
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
          type="text"
          placeholder="Nome"
          name="name"
          onChange={handleChange}
          value={formData.name}
          //   disabled={isLoading}
          required
          autoComplete="true"
        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          value={formData.email}
          //   disabled={isLoading}
          required
          autoComplete="true"
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          //   disabled={isLoading}
          required
          autoComplete="true"
          minLength={3}
        />

        <Input
          type="password"
          placeholder="Confirme sua senha"
          name="passwordConfirm"
          onChange={handleChange}
          value={formData.passwordConfirm}
          //   disabled={isLoading}
          required
          autoComplete="true"
          minLength={3}
        />

        <Button
          type="submit"
          // disabled={isLoading}
        >
          {/* {isLoading ? (
            <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
          ) : (
            "Cadastrar"
          )} */}
          Cadastrar
        </Button>
      </Form>

      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Container>
  );
}
