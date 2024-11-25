import '../../style/ConsultarProduto.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';
import comprarImg from '../../images/comprar.png';
import lapisImg from '../../images/lapis.png';
import DeletarImg from '../../images/deletar.png';

function ConsultarProduto() {
    const [produtos, setProduto] = useState([]); // Estado para armazenar os produtos
    const navigate = useNavigate(); // Hook para navegação

    // Função para listar os produtos
    async function ListarProduto() {
        try {
            let api = await fetch("http://localhost:8000/api/produtos/todos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let resposta = await api.json();
            setProduto(resposta); // Armazenar a lista de produtos no estado
        } catch (error) {
            console.error("Erro ao buscar os produtos:", error);
        }
    }

    useEffect(() => {
        ListarProduto(); // Carregar produtos ao montar o componente
    }, []);

    // Função para redirecionar para a página de atualização
    const handleUpdateClick = (produtoId) => {
        navigate(`/atualizar_produto/${produtoId}`);
    };

    // Função para redirecionar para a página de compra
    const handleBuyClick = (produtoId) => {
        navigate(`/cadastro_venda/${produtoId}`);
    };

    // Função para formatar o preço para o formato de moeda
    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2)}`;

    // Função para excluir um produto
    const handleDelete = async (produtoId) => {
        if (!window.confirm(`Tem certeza que deseja deletar o produto ${produtoId}?`)) return;

        const response = await fetch(`http://localhost:8000/api/produtos/deletar/${produtoId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert(`Produto ${produtoId} deletado com sucesso!`);
            setProduto((prevProdutos) => prevProdutos.filter((produto) => produto.id !== produtoId));
        } else {
            alert("Erro ao deletar o produto.");
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <div id='lista'>
                    <h1>Produtos</h1>
                </div>
                <div className="produtos-list">
                    {produtos.length > 0 ? (
                        produtos.map(produto => (
                            <div id='flex' key={produto.id} className="c-card-prod" style={{ cursor: 'pointer' }}>
                                <a>{produto.id} - {produto.nome}</a>
                                <a> Quantidade: {produto.quantidade}</a>
                                <a>Preço: {formatarMoeda(produto.preco)}</a>

                                <button id='editar1' onClick={() => handleUpdateClick(produto.id)}>
                                    <img src={lapisImg} alt="Editar" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                </button>

                                <button id="editar1" onClick={() => handleBuyClick(produto.id)} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={comprarImg} alt="Adicionar no carrinho" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                </button>

                                <button onClick={() => handleDelete(produto.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    <img src={DeletarImg} alt="Excluir produto" style={{ width: '24px', height: '24px' }} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Não há produtos cadastrados.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ConsultarProduto;
