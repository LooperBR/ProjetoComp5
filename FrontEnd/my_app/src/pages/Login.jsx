import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <LoginForm />
      <Link to="cadastro"><button className="register-button">Cadastrar</button></Link>
    </div>
  );
}
export default Login;
