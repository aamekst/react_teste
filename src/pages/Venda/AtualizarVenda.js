import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import '../../style/AtualizarProduto.css'; 

function AtualizarVenda() {
    const [venda, setVenda] = useState({
        quantidade: '',
        user_id: '',
        produto_id: ''
    });
    const { id } = useParams(); // Obtém o ID da venda da URL
    const navigate = useNavigate();

    // Função para buscar os detalhes da venda
    useEffect(() => {
        const fetchVenda = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/vendas/buscar/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar venda com ID ${id}: ${response.statusText}`);
                }
                const data = await response.json();
                setVenda(data);
            } catch (error) {
                console.error('Erro ao buscar venda:', error);
                window.alert('Venda não encontrada. Verifique o ID.');
            }
        };

        fetchVenda();
    }, [id]);

    // Função para atualizar os detalhes da venda
    const updateVenda = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/vendas/atualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(venda),
            });

            if (response.ok) {
                window.alert('Venda atualizada com sucesso!');
                navigate('/listar_venda'); // Redireciona para a lista de vendas
            } else {
                throw new Error(`Erro ao atualizar venda: ${response.statusText}`);
            }
        } catch (error) {
            window.alert('Erro ao atualizar a venda. tente novamente.');
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div id="formu1">
                <h1>Atualizar Venda</h1>
                <form onSubmit={updateVenda}>
                    <label htmlFor='quantidade'>Quantidade:</label>
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={venda.quantidade}
                        onChange={e => setVenda({ ...venda, quantidade: e.target.value })}
                        required
                    />
                    
                    <label htmlFor='user_id'>ID do Usuário:</label>
                    <input
                        type="number"
                        placeholder="ID do Usuário"
                        value={venda.user_id}
                        onChange={e => setVenda({ ...venda, user_id: e.target.value })}
                        required
                    />
                    
                    <label htmlFor='produto_id'>ID do Produto:</label>
                    <input
                        type="number"
                        placeholder="ID do Produto"
                        value={venda.produto_id}
                        onChange={e => setVenda({ ...venda, produto_id: e.target.value })}
                        required
                    />

                    <button type="submit">Atualizar</button>
                </form>
            </div>
        </>
    );
}

export default AtualizarVenda;
