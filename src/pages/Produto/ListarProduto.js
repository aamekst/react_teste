import '../../style/ConsultarProduto.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';

function ConsultarProduto(){
    const [produtos, setProduto] = useState([]); // Estado para armazenar os usuários
    const navigate = useNavigate(); // Hook para navegação

    async function ListarProduto(){
        try {
            let api = await fetch("http://localhost:8000/api/produtos/todos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let resposta = await api.json();
            setProduto(resposta); // Armazenar a lista de usuários no estado
        } catch (error) {
            console.error("", error);
        }

    }

    useEffect(() => {
        ListarProduto();
    }, []);

    // Função simples para redirecionar
    const handleCardClick = (produtoId) => {
        navigate(`/atualizar_produto/${produtoId}`); // Redireciona para a rota de atualização com o ID do usuário
    };

    return (
        <>
        <div>
            <Header/>
        </div>
        <div>
            <div id='lista'>
                <h1>Produtos</h1></div>
            <div className="produtos-list">
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <div id='flex'
                            key={produto.id} 
                            className="c-card-prod"
                            onClick={() => handleCardClick(produto.id)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <a>{produto.id} - {produto.nome}</a><a> Quantidade: {produto.quantidade}</a> <a>Preço: R${produto.preco}</a>
                            <button id='editar1'>Editar</button>

                        </div>                   
                         ))
                ) : (
                    <p></p>
                )}
                
            </div>
        </div>
        </>
    );
}

export default ConsultarProduto;










