import styled from "@emotion/styled";
import Error from "./Error";

import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { useEffect, useState } from "react";

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
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  
  const [ moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCripto] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCryptos = resultado.Data.map(c => {

          const objeto = {
              id: c.CoinInfo.Name,
              nombre: c.CoinInfo.FullName
          }

          return objeto
      })
      setCriptos(arrayCryptos)
    }
    consultarAPI()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
      setError(true)

      return 
    }

    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }

  return (
    <>
      {error && <Error>Todos los campos son oblitarios</Error>}
      <form
        onSubmit={handleSubmit} 
      >
        <SelectMonedas/>
        <SelectCripto/>
        <InputSubmit 
            type="submit" 
            value="Cotizar"
        />
      </form>  
    </>
    
  )
};

export default Formulario;
