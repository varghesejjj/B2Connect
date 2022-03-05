/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { Link } from 'react-router-dom'
import TokenContext from "../../store/store"

const Navbar = () => {
    const TokenCxt = useContext(TokenContext);
    const name = TokenCxt.name

    const logOut = async () => {
        await TokenCxt.stToken(null)
        await TokenCxt.stName(null)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/images/logo.png" alt="" width="30" height="30" className="d-inline-block align-text-top" /> B2 Connect
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a hidden={TokenCxt.role === 1? false: true} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-people"></i> Users</a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/createUser">Create User</Link></li>
                            </ul>
                        </li>
                        </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 navbar-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-x"></i>Hi {name}</a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a onClick={logOut} className="dropdown-item" href="/login">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
