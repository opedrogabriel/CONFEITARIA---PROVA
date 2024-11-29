
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


import { useState, useEffect } from "react";


import { useNavigate} from "react-router-dom";


const url = "http://localhost:5000/usuarios"

const Login = () => {

  localStorage.removeItem("userName")
  localStorage.removeItem("email")
  
  //Variáveis pra guardar as informações digitadas pelo usuário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

 
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");


  const [usuarios, setUsuarios] = useState([])


  useEffect(()=>{
    async function fetchData(){
      try{
          const req = await fetch(url)
          const users = await req.json()
          console.log(users)
          setUsuarios(users)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])

 
  const navigate = useNavigate()

  
  const gravarLocalStorage = (usuario) =>{
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("email", usuario.email)
  }

 
  const handleLogin = async (e) => {
   
    e.preventDefault();

    
    const userToFind = usuarios.find(
      (user)=>user.email == email
    )
    if (email != "") {
      if (senha != "") {
        if(userToFind != undefined && userToFind.senha == senha){
          gravarLocalStorage(userToFind)
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success")
          setAlertMensagem("LOGIN EFETUADO COM SUCESSO");
          alert("LOGIN EFETUADO COM SUCESSO")
          navigate("/home")
        }
        else{
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("USUARIO OU SENHA INVALIDOS");
        }
      } 
      else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O CAMPO DE SENHA NAO PODE SER VAZIO");
      }
    } 
    else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O CAMPO DE EMAIL NAO PODE SER VAZIO");
    }
  };
  return (
    <div>
      <Container
        style={{ height: "100vh" }}
        className="justify-content-center align-content-center"
      >
      
        <span
          style={{ fontSize: "200px", color: "white" }}
          className="material-symbols-outlined"
        >
          favorite
        </span>
        <Form style={{ width: "75%", margin: "auto" }} onSubmit={handleLogin}>
          
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>

          
          <FloatingLabel controlId="floatingPassword" label="Senha">
            <Form.Control
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
          </FloatingLabel>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

        
          <Button variant="light" type="submit" className="mt-4" size="lg">
            LOGIN
          </Button><br></br>
          <br></br>
        
          

          <Button href="/Cadastro">
            CADASTRE-SE
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
