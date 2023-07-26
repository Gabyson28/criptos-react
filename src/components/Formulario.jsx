import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { opcionesMonedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);

  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas(
    "Elige tu moneda",
    opcionesMonedas
  );

  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";

      const response = await fetch(url);

      const result = await response.json();

      const data = result.Data;

      const arrayCriptos = data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objeto;
      });

      setCriptos(arrayCriptos);
      
    };
    consultAPI();
  }, []);

  const handleSubmit = (e)  => {
    e.preventDefault();

    if([moneda, criptoMoneda].includes('')){
        setError(true);
        return;
    }

    setError(false);
    setMonedas({
        moneda,
        criptoMoneda
    })
  }

  return (

    <>

    {error && <Error>Todos los campos son obligatorios</Error>}

    <form
        onSubmit={handleSubmit}
    >
      <SelectMonedas />

      <SelectCriptoMonedas />

      <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  );
};

export default Formulario;
