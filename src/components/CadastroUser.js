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
                {nome}, {profissao}
                Operação= (operation())
                <h1>Cadastrar</h1>
                <label htmlFor='nome'>Nome:</label>
                <input type='text' name='nome' id='nome'/>

                <label htmlFor='email'>E-mail:</label>
                <input type='email' name='email' id='email'/>

                <label htmlFor='cpfcnpj'>CPF/CNPJ:</label>
                <input type='text' name='cpfcnpj' id='cpfcnpj'/>

                <label htmlFor='senha'>senha:</label>
                <input type='password' name='senha' id='senha'/>

                <input type='button' value="Cadastrar"/>
                
            </form>
            
        </div>
    )

}
export default CadastroUser;
