import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/Venda.css';


export default function CadastroVenda() {
    const [quantidade, setQuantidade] = useState(1);
    const [user_id, setUserId] = useState('');
    const [preco, setPreco] = useState(0); // Iniciar com 0 como número
    const [loading, setLoading] = useState(true);
    const [produto, setProduto] = useState(null); // Estado para armazenar informações do produto
    const { id } = useParams(); // ID do produto passado pela rota

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await fetch(`http://localhost:8000/api/produtos/buscar/${id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // Log da resposta para verificar dados

                if (data && data.preco) {
                    setPreco(parseFloat(data.preco));
                    setProduto(data); // Armazenar dados do produto
                } else {
                    console.error("O campo 'preco' não foi encontrado ou está incorreto na resposta da API");
                }
            } catch (error) {
                console.error("Erro ao buscar o preço do produto:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduto();
    }, [id]);

    async function salvarVenda(e) {
        e.preventDefault();

        // Verifique se a quantidade disponível é maior que zero
        if (produto.quantidade <= 0) {
            alert("Produto indisponivel.");
            return;
        }

        const venda = {
            produto_id: id,
            user_id: user_id,
            quantidade: quantidade,
            preco_total: quantidade * preco, // Calcula o total
        };

        const response = await fetch("http://localhost:8000/api/vendas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venda)
        });

        if (response.ok) {
            alert("Venda realizada com sucesso!");
            setUserId('');
            setQuantidade(1);
            navigate('/listar_produto');

        } else {
            alert("Erro ao realizar venda.");
        }
    }

    const preco_total = quantidade * preco;
    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2)}`;

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <h1>Carrinho</h1>
            <div id="formulario2">
                <p></p>
                <form onSubmit={salvarVenda}>
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input 
                        type="number" 
                        name="quantidade" 
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        min="1"
                    /><br />
                    
                    <label htmlFor="user_id">ID do usuário:</label>
                    <input 
                        type="text" 
                        name="user_id" 
                        id="user_id"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                    /><br />
                    
                    <label htmlFor="preco_total">Total:</label>
                    <input 
                        type="text" 
                        name="preco_total" 
                        id="preco_total"
                        value={formatarMoeda(preco_total)} 
                        readOnly
                    /><br />

                    <input type="submit" value="Comprar" />
                </form>
            </div>
        </>
    );
}
