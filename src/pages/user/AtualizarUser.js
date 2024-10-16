import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/AtualizarUser.css';
import Header from '../../components/Header';

function AtualizarUser() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpfcnpj: ''
    });

    const { id } = useParams(); // Obtém o ID do usuário da URL
    const navigate = useNavigate();

    // Função para buscar o usuário existente
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8000/api/users/buscar/${id}`);
            const data = await response.json();
            setUser(data);
        };

        fetchUser().catch(error => console.error('Erro ao buscar o usuário:', error));
    }, [id]);

    // Função para atualizar o usuário
    const updateUser = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/api/users/atualiza/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            // Exibe um alerta de sucesso
            window.alert('Usuário atualizado com sucesso!');
            navigate('/listar_user'); // Redireciona após a atualização
        } else {
            console.error('Erro ao atualizar usuário:', response.status);
            window.alert('Erro ao atualizar usuário. Tente novamente.');
        }
    };

    return (
        <>
        <div>
            <Header/>
        </div>
        <div id="formu">
            <h1>Atualizar Usuário</h1>
            <form onSubmit={updateUser}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="CPF/CNPJ"
                    value={user.cpfcnpj}
                    onChange={e => setUser({ ...user, cpfcnpj: e.target.value })}
                    required
                />
                <button type="submit">Atualizar</button>
            </form>
        </div>
        </>
    );
}

export default AtualizarUser;
