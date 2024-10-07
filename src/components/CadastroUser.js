import './CadastroUser.css';

function CadastroUser(){
    let nome = "Alana";
    let profissao = "Dev";

    function soma (){
        return 2+5;

    }

    function operation(n1, n2){
        return n1*n2

    }

    return(
        <div id="formulario">
            <form>
                <h1>Cadastrar</h1>
                <label htmlFor='nome'>Nome:</label>
                <input type='text' name='nome' id='nome'/><br></br>

                <label htmlFor='email'>E-mail:</label>
                <input type='email' name='email' id='email'/>

                <label htmlFor='cpfcnpj'>CPF/CNPJ:</label>
                <input type='text' name='cpfcnpj' id='cpfcnpj'/>

                <label htmlFor='senha' >Senha:</label>
                <input type='password' name='senha' id='senha'/><br></br>

                <input type='button' value="Cadastrar"/>
                
            </form>
            
        </div>
    )

}
export default CadastroUser;
