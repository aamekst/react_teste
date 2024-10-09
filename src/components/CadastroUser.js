import './CadastroUser.css';
import { useState } from 'react';

function CadastroUser() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [cpfcnpj, setCpfCnpj] = useState('');
    const [senha, setSenha] = useState('');

    async function salvar(e) {
        e.preventDefault();

        // Montar o objeto com os dados do formulário
        const user = {
            name: nome,
            email: email,
            password: senha,
            cpfcnpj: cpfcnpj,
            is_active: true 
        };

        // Enviar os dados para a API
        let api = await fetch("http://localhost:8000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let resposta = await api.json();

        if (!nome || !email || !cpfcnpj || !senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return; 
        }

        if (api.ok) {
            console.log("Usuário cadastrado com sucesso:", resposta);
            alert("Usuário cadastrado com sucesso. Bem vindo, "+ nome);
            setNome('');
            setEmail('');
            setCpfCnpj('');
            setSenha('');
        } else {
            console.error("Erro ao cadastrar o usuário:", resposta);
            alert("Erro ao cadastrar usuário.");
        }
    }

    return (
        <div id="formulario">
            <form onSubmit={salvar}>
                <h1>Cadastrar</h1>

                <label htmlFor='nome'>Nome:</label>
                <input 
                    type='text' 
                    name='nome' 
                    id='nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                /><br />

                <label htmlFor='email'>E-mail:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />

                <label htmlFor='cpfcnpj'>CPF/CNPJ:</label>
                <input 
                    type='text' 
                    name='cpfcnpj' 
                    id='cpfcnpj'
                    value={cpfcnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                /><br />

                <label htmlFor='senha'>Senha:</label>
                <input 
                    type='password' 
                    name='senha' 
                    id='senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                /><br /><br></br>

                <input type='submit' value="Cadastrar" />
            </form>
        </div>
    );
}

export default CadastroUser;
