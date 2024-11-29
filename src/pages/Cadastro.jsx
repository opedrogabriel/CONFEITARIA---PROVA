import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const urlProd = "http://localhost:5000/usuarios";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { nome, email, senha, confirmarSenha } = formData;
    console.log(
        formData
    )

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("PREENCHA TODOS OS CAMPOS!");
      try {
        const req = await fetch("http://localhost:5000/usuarios", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        });
        const res = req.json();
        console.log(res);
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMensagem("PRODUTO CADASTRADO COM SUCESSO");
        alert("PRODUTO CADASTRADO COM SUCESSO");

      }
      catch (erro) {

      }
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("AS SENHAS NAO COINCIDEM");
      return;
    }

    setErro("");
    alert("USUARIO CADASTRADOS COM SUCESSO!");
    console.log("DADOS CADASTRADOS:", formData);
    navigate("/login");

    setFormData({
      email: "",
      senha: "",
      confirmarSenha: "",
    });
  };

  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>CADASTRO DE USUARIOS </h2>
        {erro && <p style={styles.error}>{erro}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="nome">
              NOME:
            </label>
            <input
              type="nome"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="senha">
              SENHA:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmarSenha">
              CONFIRMAR SENHA:
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    alignitens: "center",
    background: "#fff",
    padding: "20px 30px",
    margin: "auto",

    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Cadastro;
