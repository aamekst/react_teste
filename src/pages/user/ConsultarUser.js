import '../../style/ConsultarUser.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';
import DeletarImg from '../../images/deletar.png';

function ConsultarUser() {
    const [users, setUsers] = useState([]); // Estado para armazenar os usuários
    const navigate = useNavigate(); // Hook para navegação

    // Função para buscar os usuários
    async function buscar() {
        try {
            let api = await fetch("http://localhost:8000/api/users/todos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let resposta = await api.json();
            setUsers(resposta); // Armazenar a lista de usuários no estado
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    // Chamar a função buscar quando o componente for montado
    useEffect(() => {
        buscar();
    }, []);

    // Função para redirecionar ao editar
    const handleCardClick = (userId) => {
        navigate(`/atualizar_user/${userId}`); // Redireciona para a rota de atualização com o ID do usuário
    };

    // Função para deletar o usuário
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(`Tem certeza que deseja deletar o usuário?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/users/deletar/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert(`Usuário ${userId} deletado com sucesso!`);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Remove o usuário da lista local
            } else {
                const errorData = await response.json();
                alert(`Erro ao deletar o usuário: ${errorData.message || 'Usuário ativo.'}`);
            }
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error);
            alert("Ocorreu um erro ao tentar deletar o usuário.");
        }
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <div id='lista-user'>
                    <h1>Usuários</h1>
                </div>
                <div className="users-list">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div
                                key={user.id}
                                className="c-card"
                                style={{ cursor: 'pointer', position: 'relative' }}
                            >
                                <h2 onClick={() => handleCardClick(user.id)}>
                                    {user.id} - {user.name}
                                </h2>
                                <p>{user.email}</p>
                                <p>CPF/CNPJ: {user.cpfcnpj}</p>
                                <button
                                    id='deletar1'
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                        cursor: 'pointer',
                                        background: 'none',
                                        border: 'none',
                                        position: 'absolute',
                                        right: '10px',
                                        top: '10px',
                                    }}
                                >
                                    <img
                                        src={DeletarImg}
                                        alt="Excluir usuário"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                        }}
                                    />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum usuário encontrado.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ConsultarUser;
