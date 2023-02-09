import RequestHTTP from "../libraries/RequestHTTP"
export default function LoginForm() {

    async function handleSubmit(e){
        e.preventDefault()
        let options =[
            "POST",
            'http://localhost:9001/login',
            [{
                header:'Content-Type',
                value:'application/json'
            }],
            '{"login":"'+e.target.login.value+'","senha":"'+e.target.login.value+'"}'    
        ]
        let login = await RequestHTTP(...options)
        console.log(login)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">login:</label><br/>
            <input type="text" id="login" name="login"/><br/>
            <label htmlFor="senha">senha:</label><br/>
            <input type="password" id="senha" name="senha"/><br></br>
            <input type="submit" value="Logar" />
        </form>
    );
}