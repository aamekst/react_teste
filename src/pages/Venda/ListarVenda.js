import '../../style/ConsultarVenda.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import Header from '../../components/Header';
import DeletarImg from '../../images/deletar.png';
import lapisImg from '../../images/lapis.png';



function ConsultarVenda() {
    const [vendas, setVendas] = useState([]); // Estado para armazenar as vendas
    const navigate = useNavigate(); // Hook para navegação

    // Função para listar todas as vendas
    async function listarVendas() {
        try {
            const response = await fetch("http://localhost:8000/api/vendas/todos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao listar vendas: ${response.statusText}`);
            }

            const resposta = await response.json();
            setVendas(resposta); 
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            window.alert('Erro ao carregar a lista de vendas. Tente novamente mais tarde.');
        }
    }

    // Chama listarVendas assim que o componente é montado
    useEffect(() => {
        listarVendas();
    }, []);

    // Função para redirecionar para a página de atualização de vendas
    const handleUpdateClick = (vendaId) => {
        navigate(`/atualizar_venda/${vendaId}`);
    };

    const handleDelete = async (vendaId) => {
        if (!window.confirm(`Tem certeza que deseja deletar o venda ${vendaId}?`)) return;

        const response = await fetch(`http://localhost:8000/api/produtos/deletar/${vendaId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert(`Venda ${vendaId} deletado com sucesso!`);
            setVendas((prevProdutos) => prevProdutos.filter((produto) => produto.id !== vendaId));
        } else {
            alert("Erro ao deletar o venda.");
        }
    };


    // Função para formatar valores monetários
    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <div id="listas">
                    <h1>Vendas</h1>
                </div>
                <div className="venda-list">
                    {vendas.length > 0 ? (
                        vendas.map(venda => (
                            <div
                            key={venda.id} // A chave deve estar diretamente no elemento de nível superior dentro do map
                            className="c-card-venda"
                            id="flex"
                            style={{ cursor: 'pointer' }}
                        >
                        
                                <p>ID: {venda.id}</p>
                                <p>Produto: {venda.nomeProduto}</p>
                                <p>Quantidade: {venda.quantidade}</p>
                                <p>Preço: {formatarMoeda(venda.preco)}</p>
                                <p>Usuário: {venda.nomeCliente}</p>

                                <button 
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }} 
                                onClick={() => handleUpdateClick(venda.id)}
                            ><img src={lapisImg} alt="Editar" style={{ width: '24px', height: '24px', marginRight: '8px' }} />

                            </button>

                                <button onClick={() => handleDelete(venda.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    <img src={DeletarImg} alt="Excluir venda" style={{ width: '24px', height: '24px' }} />
                                </button>
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

export default ConsultarVenda;
