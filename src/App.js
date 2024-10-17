import React from 'react';
import { useNavigate } from 'react-router-dom';
import carrinhoImg from './images/carrinho.png';   // Caminho correto para a imagem
import Header from './components/Header';
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Header/>
      </div>
      <div>
        <img id="saleImagem" src={carrinhoImg} alt="Imagem do Livro" />
      </div>
    </>
  );
}

export default App;
