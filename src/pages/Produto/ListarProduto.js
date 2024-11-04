import '../../style/ConsultarProduto.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';
import comprarImg from '../../images/comprar.png'
import lapisImg from '../../images/lapis.png'


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
    const handleUpdateClick = (produtoId) => {
        navigate(`/atualizar_produto/${produtoId}`);
    };

    // Função para redirecionar para a rota de compra
    const handleBuyClick = (produtoId) => {
        navigate(`/cadastro_venda/${produtoId}`);
    };

    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2)}`;

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
                            style={{ cursor: 'pointer' }}
                        >
                            <a>{produto.id} - {produto.nome}</a><a> Quantidade: {produto.quantidade}</a> <a>Preço: {formatarMoeda(produto.preco)}</a>
                            <><button id='editar1' onClick={() => handleUpdateClick(produto.id)}><img src={lapisImg} alt="Editar" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                            </button>
                            <button id="editar1"  onClick={() => handleBuyClick(produto.id)} style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={comprarImg} alt="Adicionar no carrinho" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                            </button></>

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










