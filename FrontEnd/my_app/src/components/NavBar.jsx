import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavBar() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    function logout(){
        removeCookie('username', { path: '/' })
        removeCookie('token', { path: '/' })
        console.log("teste")
    }
    return (
        <nav className="header">
            <ul>
                <li>
                    <Link to="home">Home</Link>
                </li>
                <li>
                    <Link to="atividades">Atividades</Link>
                </li>
                <li>
                    <Link to="perfil">Perfil</Link>
                </li>
                <li>
                    <Link to="tipo_atividade">Tipo Atividade</Link>
                </li>
                {/*<li>
                    <Link to="fdshgjsdkjhdsj">Erro</Link>
                </li>*/}
                <li>
                    <Link to="" onClick ={logout}>logout</Link>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;