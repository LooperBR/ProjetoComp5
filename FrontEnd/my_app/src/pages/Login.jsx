import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm"
function Login() {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
            <Link to='home'>home</Link>
        </div>
    );
}
export default Login;