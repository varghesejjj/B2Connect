import { useParams } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import TokenContext from "../../store/store"
import { backendurl, fileurl } from "../../env";
import { ArrowLeft } from "react-bootstrap-icons"

import { Link } from "react-router-dom";


async function populateUser(url, token) {
    try {
        const user = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
        return user.data.user
    }
    catch (err) {
        console.log(err)
    }
}
const ViewUserPage = () => {
    let url = null
    const TokenCxt = useContext(TokenContext);
    const [user, setUser] = useState()
    const id = useParams()
    
    url = backendurl + "/getUser/" + id.id
    

    useEffect(() => {
        const getCompanyUser = async () => {
           
            const users = await populateUser(url, TokenCxt.token);
            setUser(users)
            
        }
        getCompanyUser()
    }, [TokenCxt.token, url])
    if(user){

        return (
            <div className="container-fluid">
                <div className="row">
                <Link title="Back to Create Users" to="/createUser"><span><ArrowLeft className="btn btn-primary w-25" size={40} /></span></Link>
                    <section className='forms'>
                        <form>
                        <img alt="Profile" className="photo" src={fileurl + user.photo} name="profilephoto" placeholder="Profile Photo" />
                            <h2 style={{ textDecoration: "underline" }}>{user.firstName} {user.lastName}</h2>
                            <div className="mb-3"></div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <label className="label" htmlFor="firstName">First Name:</label>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.firstName} type="text" name="firstname" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="col-sm-1">
                                    <label className="label" htmlFor="lastName">Last Name:</label>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.lastName} type="text" name="lastname" placeholder="Last Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="label" htmlFor="phone">Phone Number:</label>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.phone} type="text" name="phone" placeholder="Phone Number" />
                                    </div>
                                </div>
                                <div className="col-sm-1">
                                    <label className="label" htmlFor="gender">Gender:</label>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3">
                                        {user.gender}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <label className="label" htmlFor="email">Email:</label>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.email} type="email" name="email" placeholder="Email" />
                                    </div>
                                </div>
    
                                <div className="col-sm-2">
                                    <label className="label" htmlFor="mobile">Mobile Number:</label>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.mobile} type="text" name="mobile" placeholder="Mobile Number" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <label className="label" htmlFor="role">Role</label>
                                </div>
                                <div className="col-sm-5">
                                    <div className="mb-3">
                                        <input disabled={true} className="form-control" value={user.role === 1? "Admin": "Others"} type="text" name="address" placeholder="Address" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )

    }  
    else{
        return(<h1>Loading</h1>)
    }  
}

export default ViewUserPage
