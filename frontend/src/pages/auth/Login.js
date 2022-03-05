import { useContext, useRef } from "react";
import { createBrowserHistory } from "history";
import TokenContext from "../../store/store"
import axios from "axios"
import { Link } from "react-router-dom"
import Header from '../../components/LayoutComponents/Header'
import { backendurl } from "../../env";
async function loginUser(credentials) {
    try {
        const res = await axios.post(backendurl + "/auth/login", credentials
        )
        if (res) return res.data
    } catch (err) {
        console.log(err)
    }
}



function Login() {
    const TokenCxt = useContext(TokenContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = createBrowserHistory();
    const handleSubmit = async e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const user = await loginUser({
            email, password
        })
        if (user.success) {
            TokenCxt.stToken(user.token)
            TokenCxt.stName(user.name)
            TokenCxt.stId(user.id)
            TokenCxt.stRole(user.role)
            history.replace("/")
        }
        else {
            alert(user.message);
            history.go(0)
        }
    }
    return (
        <section className='login'>
            <Header />
            <form onSubmit={handleSubmit}>
                <h2 className="visually-hidden">Login Form</h2>
                <div className="illustration">
                    <img alt="logo" src="/images/logo.png" />
                </div>
                <div className="mb-3">
                    <input className="form-control" ref={emailRef} type="email" name="email" placeholder="Email" />
                </div>
                <div className="mb-0"><input className="form-control" ref={passwordRef} type="password" name="password" placeholder="Password" />
                </div>
                <button className="btn btn-primary w-100" type="submit">
                    Log in
                </button>
                <div className="mb-3"></div>
                <Link className="forgot" to="/resetemail">Forgot your email or password?</Link>
            </form>
        </section>
    )
}
export default Login;