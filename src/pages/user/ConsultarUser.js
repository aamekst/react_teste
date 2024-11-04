import '../../style/ConsultarUser.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import Header from '../../components/Header';

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

    // Função simples para redirecionar
    const handleCardClick = (userId) => {
        navigate(`/atualizar_user/${userId}`); // Redireciona para a rota de atualização com o ID do usuário
    };

    return (
        <>
        <div>
            <Header/>
        </div>
        <div>
            <div id='lista-user'>
                <h1>Usuários</h1></div>
            <div className="users-list">
                {users.length > 0 ? (
                    users.map(user => (
                        <div 
                            key={user.id} 
                            className="c-card"
                            onClick={() => handleCardClick(user.id)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <h2>{user.id} - {user.name}</h2>
                            <p>{user.email}</p>
                            <p>CPF/CNPJ: {user.cpfcnpj}</p>
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

export default ConsultarUser;
