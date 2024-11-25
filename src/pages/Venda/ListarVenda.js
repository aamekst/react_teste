import '../../style/ConsultarVenda.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import Header from '../../components/Header';

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
                                key={venda.id} 
                                className="c-card-venda"
                                id="flex"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleUpdateClick(venda.id)} // Redireciona ao clicar no card
                            >
                                <p>ID: {venda.id}</p>
                                <p>Produto: {venda.nomeProduto}</p>
                                <p>Quantidade: {venda.quantidade}</p>
                                <p>Preço: {formatarMoeda(venda.preco)}</p>
                                <p>Usuário: {venda.nomeCliente}</p>
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
