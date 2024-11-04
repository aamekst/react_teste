import { useState } from 'react';
import '../../style/CadastroProduto.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';

export default function CadastroProduto(){
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [user_id, setUserId] = useState('');

    const navigate = useNavigate();

    async function salvarProduto(e){
        e.preventDefault();

        const produto ={
            nome: nome,
            preco: parseFloat(preco),
            quantidade: parseInt(quantidade),
            user_id: user_id,

        };

        let api = await fetch("http://localhost:8000/api/produtos",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        let retorno = await api.json();

        if(api.ok){
            console.log("Produto cadastrado com sucesso!");
            alert("Produto " +nome+ " cadastrado com sucesso!")
            setNome('');
            setPreco('');
            setQuantidade('');
            setQuantidade('');
            navigate('/listar_produto');
        }else{
            alert("Erro ao cadastrar");
        }



    }

    return(
        <>
            <div>
                <Header/>
            </div>
            <div id="formSave">
                <form onSubmit={salvarProduto}>
                    <h1>Cadastrar Produto</h1>
                    <label htmlFor='nome'>Nome:</label>
                    <input 
                        type='text' 
                        name='nome' 
                        id='nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    /><br />

                    <label htmlFor='preco'>Preço unitário:</label>
                    <input 
                        type='text' 
                        name='preco' 
                        id='preco'
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    /><br />

                    <label htmlFor='quantidade'>Quantidade:</label>
                    <input 
                        type='number' 
                        name='quantidade' 
                        id='quantidade'
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    /><br />

                    <label htmlFor='user_id'>ID do usuário:</label>
                    <input 
                        type='number' 
                        name='user_id' 
                        id='user_id'
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                    /><br /><br></br>


                    <input type='submit' value="Cadastrar" />

                </form>

            </div>
        
        </>
    )



}