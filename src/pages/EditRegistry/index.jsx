import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Form, Input, Button } from "../../components/FormComponents";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/PageComponents/Header";
import { styled } from "styled-components";
import useRegistry from "../../hooks/useRegistry";
import LoadingScreen from "../../components/LoadingScreen";

export default function EditRegistry() {
  const navigate = useNavigate();
  const { registry } = useRegistry();
  const [formData, setFormData] = useState({
    value: registry.value,
    description: registry.description,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { tipo, id } = useParams();

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

    setIsLoading(true);
    const promise = api.editRegistry(
      {
        ...formData,
      },
      tipo,
      id,
      auth
    );

    promise.then((res) => {
      setIsLoading(false);
      navigate("/home");
      console.log(res);
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
      <Header>Editar {tipo == "entrada" ? "entrada" : "saída"}</Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Valor"
          name="value"
          onChange={handleChange}
          value={formData.value}
          required
          autoComplete="true"
          data-test="registry-amount-input"
        />
        <Input
          type="text"
          placeholder="Descrição"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
          autoComplete="true"
          data-test="registry-name-input"
        />

        <Button type="submit" data-test="registry-save">
          Atualizar {tipo == "entrada" ? "entrada" : "saída"}
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 25px;
`;
