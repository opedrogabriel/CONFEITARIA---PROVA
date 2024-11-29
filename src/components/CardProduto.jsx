import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {

  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/produtos/${props.id}`, 
    {
      method:"DELETE"
    });
    const res = await req.json()
    console.log(res)
    alert(`Produto ${res.nome} removido`)
  };

  return (
    <div>
      <Card style={{ width: "16rem", height: "30rem" }}>
  
        <Card.Img variant="top" src={props.imagemUrl} height="200px" />

        <Card.Body>
       
          <Card.Title>{props.nome}</Card.Title>
        
          <Card.Subtitle className="mb-2 text-muted">
            PREÇO: {props.preco}
          </Card.Subtitle>
          <Card.Text>
            <b> DESCRIÇÃO: </b> <br></br> {props.descricao}
          </Card.Text>
          <Card.Text>
            <b> CATEGORIA: </b> <br></br> {props.categoria}
          </Card.Text>

          <Card.Link href={`/produto/editar/${props.id}`}>
            <Button variant="primary">EDITAR</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="warning" type="button" onClick={handleDelete}>
              EXCLUIR
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
