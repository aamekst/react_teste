import './App.css';
import CadastroUser from './pages/user/CadastroUser';
import ConsultarUser from './pages/user/ConsultarUser';
import { useNavigate } from 'react-router-dom';  // Importa o useNavigate
import { Routes, Route } from 'react-router-dom'; // Para definir as rotas
import React from 'react';
import './index.js';
import Header from './components/Header.js';


function App() {

  const navigate = useNavigate();
  return (
    <>
    <div>
      <Header/>
    </div>
    <div >
        <h2 id="title">Cidade de SP pode ter novo recorde de calor do ano nesta quarta,<br/> com máxima de 36°C</h2>
        Índice supera os 35°C registrados nesta terça (24), maior temperatura do ano até agora, segundo dados do Instituo Nacional de Meteorologia (Inmet).
        <p>O calor deve dar uma pequena trégua apenas no sábado, quando a máxima não passa dos 24°C. No domingo, porém, a temperatura já volta a ficar acima dos 30°C.
        A primavera começou oficialmente no hemisfério sul às 9h44 do domingo (22). Segundo o Centro de Gerenciamento de Emergências Climáticas (CGE), da prefeitura, a estação na capital terá grandes oscilações de temperatura e dias chuvosos.</p>
      
      <a href='https://www.climatempo.com.br/previsao-do-tempo/15-dias/cidade/558/saopaulo-sp'>Leia mais</a>
      <button onClick={() => navigate('/listar_user')}>Usuários</button>
     
    </div>
    
    
    </>



    
  );
}

export default App;
