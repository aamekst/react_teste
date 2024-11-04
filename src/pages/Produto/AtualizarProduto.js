import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import '../../style/AtualizarProduto.css';

function AtualizarProduto(){
    const[produto, setProduto] = useState({
        nome: '',
        quantidade: '',
        preco: '',
        user_id: ''
    });
    const { id } = useParams(); // Obtém o ID do usuário da URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduto = async () => {
            const response = await fetch(`http://localhost:8000/api/produtos/buscar/${id}`);
            const data = await response.json();
            setProduto(data);
        };

        fetchProduto().catch(error => console.error('Produto não encontrado', error));
    }, [id]);



    const updateProduto = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/api/produtos/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            // Exibe um alerta de sucesso
            window.alert('Produto atualizado com sucesso!');
            navigate('/listar_produto'); // Redireciona após a atualização
        } else {
            console.error('Erro ao atualizar Produto:', response.status);
            window.alert('Erro ao atualizar Produto. Tente novamente.');
        }
    };

    return (
        <>
        <div>
            <Header/>
        </div>
        <div id="formu1">
            <h1>Atualizar Produto</h1>
            <form onSubmit={updateProduto}>
            <label htmlFor='nome'>Nome:</label>
                <input
                    type="text"
                    placeholder="Nome"
                    value={produto.nome}
                    onChange={e => setProduto({ ...produto, nome: e.target.value })}
                    required
                />
                <label htmlFor='nome'>Preço unitário:</label>
                <input
                    type="numeric"
                    placeholder="Preço unitário"
                    value={produto.preco}
                    onChange={e => setProduto({ ...produto, preco: e.target.value })}
                    required
                />
                <label htmlFor='nome'>Quantidade:</label>
                <input
                    type="numeric"
                    placeholder="Quantidade"
                    value={produto.quantidade}
                    onChange={e => setProduto({ ...produto, quantidade: e.target.value })}
                    required
                />

                <button type="submit">Atualizar</button>
            </form>
        </div>
        </>
    );
}

export default AtualizarProduto;

