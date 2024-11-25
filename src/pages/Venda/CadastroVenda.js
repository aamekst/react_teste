import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/Venda.css';
import sacolaImg from '../../images/sacola.png';

export default function CadastroVenda() {
    const [quantidade, setQuantidade] = useState(1);
    const [user_id, setUserId] = useState('');  // ID do usuário
    const [preco, setPreco] = useState(0); 
    const [produto, setProduto] = useState(null); 
    const [nomeProduto, setNomeProduto] = useState('');  // Nome do produto
    const [nomeCliente, setNomeCliente] = useState('');  // Nome do cliente
    const [loading, setLoading] = useState(true);
    const { id } = useParams();  // ID do produto

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduto() {
            try {
                const response = await fetch(`http://localhost:8000/api/produtos/buscar/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Erro ao buscar produto: status ${response.status}`);
                }

                const data = await response.json();
                console.log("Dados do produto:", data); // Verificando a resposta para ver os dados retornados

                if (data && data.preco) {
                    setPreco(data.preco);
                    setProduto(data);
                    setNomeProduto(data.nome); // Nome do produto
                    if (data.userResponseDto) {
                        setUserId(data.userResponseDto.id);  // ID do usuário
                        setNomeCliente(data.userResponseDto.name); // Nome do cliente (usuário)
                    }
                } else {
                    console.error("O campo 'preco' não foi encontrado ou está incorreto na resposta da API");
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduto();
    }, [id]);

    const salvarVenda = async (e) => {
        e.preventDefault();

        if (produto.quantidade <= 0 || quantidade > produto.quantidade) {
            alert("Produto indisponível ou quantidade excede o estoque.");
            return;
        }

        const venda = {
            produto_id: id,
            user_id: user_id,
            quantidade: quantidade,
            preco_total: quantidade * preco, // Calcula o total
        };

        try {
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
                navigate('/listar_venda');
            } else {
                const errorData = await response.json();
                console.error("Erro ao realizar venda:", errorData);
                alert("Erro ao realizar venda.");
            }
        } catch (error) {
            console.error("Erro ao enviar requisição de venda:", error);
            alert("Erro ao realizar venda.");
        }
    };

    const preco_total = quantidade * preco;
    const formatarMoeda = (valor) => `R$ ${valor.toFixed(2)}`;

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <h1>Carrinho</h1>
            
            <div className="carrinho-container">
                <img src={sacolaImg} id='sacola' alt="Carrinho" />
    
                <div id="formulario2">
                    <form onSubmit={salvarVenda}>
                        <h3>{nomeProduto}</h3>
                        <br />
                        <label htmlFor="quantidade">Quantidade:</label>
                        <input 
                            type="number" 
                            name="quantidade" 
                            id="quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            min="1"
                         
                        />
                        
                        <label htmlFor="preco_total">Total:</label>
                        <input 
                            type="text" 
                            name="preco_total" 
                            id="preco_total"
                            value={formatarMoeda(preco_total)} 
                            readOnly
                        /><br />
                        
                        <label htmlFor="nomeCliente">Cliente:</label>
                        <input 
                            type="text" 
                            name="nomeCliente" 
                            id="nomeCliente"
                            value={nomeCliente} 
                            readOnly
                        /><br />
    
                        <input type="submit" value="Comprar" />
                    </form>
                </div>
            </div>
        </>
    );
}
