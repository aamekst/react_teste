import '../../style/ConsultarVenda.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';



function ConsultarVenda(){
    const [vendas, setVenda] = useState([]); // Estado para armazenar os usuários
    const navigate = useNavigate(); // Hook para navegação

    async function ListarVenda(){
        try {
            let api = await fetch("http://localhost:8000/api/vendas/todos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let resposta = await api.json();
            setVenda(resposta); 
        } catch (error) {
            console.error("", error);
        }

    }

    useEffect(() => {
        ListarVenda();
    }, []);


    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2)}`;

    return (
        <>
        <div>
            <Header/>
        </div>
        <div>
            <div id='listas'>
                <h1>Vendas</h1></div>
            <div className="venda-list">
                {vendas.length > 0 ? (
                    vendas.map(venda => (
                        <div id='flex'
                            key={venda.id} 
                            className="c-card-venda"
                            style={{ cursor: 'pointer' }}
                        >
                            <a>ID: {venda.id}</a><a>Produto: {venda.nomeProduto}</a><a> Quantidade: {venda.quantidade}</a><a> Preço: {formatarMoeda(venda.preco)}</a> <a>Usuário: {venda.nomeCliente}</a>
                            <>
                            </>

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










