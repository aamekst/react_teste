import './CadastroUser.css';
import {useState} from 'react';

function CadastroUser(){
    const [email, SetEmail] = useState('')
    console.log(email)

    let nome = "Alana";
    let profissao = "Dev";



   async function salvar(){

        let api = await fetch("https://viacep.com.br/ws/"+email+"/json/");
        let resposta = await api.json();

        if(api.ok){
            console.log(resposta)
            return
        }
    
        console.log(resposta);
        
    }

    return(
        <div id="formulario">
            <form>
                <h1>Cadastrar</h1>
                <label htmlFor='nome'>Nome:</label>
                <input type='text' name='nome' id='nome'/><br></br>

                <label htmlFor='email'>E-mail:</label>
                <input 
                    type='email' 
                    name='email' 
                    id='email'
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                    
                    />

                <label htmlFor='cpfcnpj'>CPF/CNPJ:</label>
                <input type='text' name='cpfcnpj' id='cpfcnpj'/>

                <label htmlFor='senha' >Senha:</label>
                <input type='password' name='senha' id='senha'/><br></br>

                <input onClick={salvar} type='button' value="Cadastrar"/>
                
            </form>
            
        </div>
    )

}
export default CadastroUser;
