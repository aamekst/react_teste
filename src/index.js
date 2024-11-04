import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CadastroUser from './pages/user/CadastroUser';
import ConsultarUser from './pages/user/ConsultarUser';
import AtualizarUser from './pages/user/AtualizarUser';
import Nopage from './components/Nopage';
import CadastroProduto from './pages/Produto/CadastroProduto';
import ListarProduto from './pages/Produto/ListarProduto';
import AtualizarProduto from './pages/Produto/AtualizarProduto';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/cadastro_user' element={<CadastroUser/>}/>
     
      <Route path='/atualizar_user/:id' element={<AtualizarUser/>}/>
      <Route path='/cadastro_produto' element={<CadastroProduto/>}/>
      <Route path='/listar_produto' element={<ListarProduto/>}/>
      <Route path='/listar_user' element={<ConsultarUser/>}/>
      <Route path='/atualizar_produto/:id' element={<AtualizarProduto/>}/>
      <Route path='*' element={<Nopage/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
