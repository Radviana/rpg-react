import React, { useState, useEffect } from "react";
// Configuração para requisições na rede
import web3 from "./web3";
// Informação do contrato
import rpg from "./rpg";

const App = () => {
  // Cria variáveis e funções de alteração
  const [gerente, setGerente] = useState("");
  const [jogadores, setJogadores] = useState("");
  const [saldo, setSaldo] = useState("");
  const [value, setValue] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [faces, setFaces] = useState("");

  // Função assincrona que carrega os dados do contrato
  const carregarDados = async () => {
    // Pega a carteira do gerente do contrato
    const _gerente = await rpg.methods.gerente().call();
    // Pega a carteira dos jogadores
    const _jogadores = await rpg.methods.getJogadores().call();
    // Pega o valor total vinculado ao contrato
    const _saldo = await web3.eth.getBalance(rpg.options.address);

    // Armazena os valores nas variáveis de gerente, jogador e saldo
    setGerente(_gerente);
    setJogadores(_jogadores);
    setSaldo(_saldo);
    setValue("");
    setFaces("");
  };
  // Antes da página carregar ele chama seu conteúdo
  useEffect(() => {
    // Busca dados do contrato
    carregarDados();
  }, []);

  // * Realiza sorteio
  const sortear = async () => {
    try {
      //event.preventDefault;
      setMensagem("Aguardando processamento...");
      const contas = await web3.eth.getAccounts();
      const faces = 1000;
      await rpg.methods.Dado(faces).send({
        from: contas[0],
        value: web3.utils.toWei(value, "ether"),
        faces: faces,
      });
      const resultado_dado = await rpg.methods.Mostra_Resultado().call();
      // Recarrega dados da página
      await carregarDados();
      // Altera mensagem
      setMensagem("Dado Sorteado! Resultado: " + resultado_dado);
    } catch (error) {
      // Caso o usuário cancele a solicitação no metamask
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
        // Caso algo esteja fora das políticas do contrato
        setMensagem("Transação vai contra regras do contrato");
      }
    }
  };

  return (
    <div>
      <h2>Contrato de RPG</h2>
      <p>Este contrato é gerenciado por {gerente}</p>
      <br />
      <form onSubmit={sortear}>
        <h4>Quanto deseja incrementar os dados?</h4>
        <div>
          <label>Quantidade de ether para ser enviado: </label>
          <input
            value={value}
            // Altera o valor que está sendo apostado
            onChange={(event) => setValue(event.target.value)}
          />
          <br />
        </div>
        <br />
      </form>
      <button onClick={sortear}> Rolar Dado</button>
      <br />
      {/* Mostra mensagem ao usuário */}
      <h1>{mensagem}</h1>
    </div>
  );
};

export default App;