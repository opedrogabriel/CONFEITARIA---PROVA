import { useState } from "react";

const VerUse = () => {
  let contador = 0;
  const [contagem, setContagem] = useState(0)
  return (
    <div>
      {/* Com javascript puro */}
      <h1>{contador}</h1>
      <button
        onClick={() => {
          contador++;
          console.log(contador);
        }}
      >
        Aumentar contador
      </button>
      
      {/* Com useState */}
      <h1>{contagem}</h1>
      <button
        onClick={() => {
          setContagem(contagem + 1)
        }}
      >
        Aumentar contagem
      </button>

     </div>
  );
};

export default VerUse;
