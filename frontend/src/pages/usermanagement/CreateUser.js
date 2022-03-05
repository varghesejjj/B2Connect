import { useEffect, useRef, useState, useContext } from "react";
import Select from 'react-select';
import { createBrowserHistory } from "history";
import axios from "axios"
import TokenContext from "../../store/store"
import "../../styles/forms.css"
import { backendurl } from "../../env";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
import { InfoSquare } from 'react-bootstrap-icons';

import { Link } from "react-router-dom";

async function createUser(data, token) {
    try {
        const res = await axios.post(backendurl + '/createUser', data, {
            headers: { "Authorization": `Bearer ${token}` },
            onUploadProgress: progressEvent => {
                console.log("Event Progress : " + progressEvent.loaded)
            }
        })
        if (res) return res.data
    } catch (err) {
        console.log(err)
    }
}

async function populateUsers(token) {
    try {
        const usrs = await axios.get(backendurl + "/getUsers",
            { headers: { "Authorization": `Bearer ${token}` } })
        return usrs.data.users
    }
    catch (err) {
        console.log(err)
    }
}
function CreateUsersPage() {
    const TokenCxt = useContext(TokenContext);
    const [gender, setGender] = useState([])
    const [role, setRole] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {

            const usersFromServer = await populateUsers(TokenContext.token);
            setUsers(usersFromServer)
        }
        getUsers()
    }, [])

    let uses = []
    if(users){
        users.forEach((user) => {
    
            let da = {
                id: user._id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                phone: user.phone,
                options: <>
                    <Link to={`/user/${user._id}`} title="View more...">
                        <span>
                            <InfoSquare color="#343a40" />
                        </span>
                    </Link>&nbsp;
                </>
            }
            uses.push(da)
        })
    }
    const columns = [
        {
            dataField: 'name',
            text: 'Name',
            sort: true
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true
        },
        {
            dataField: 'phone',
            text: 'Phone',
            sort: true
        },
        {
            dataField: 'options',
            text: 'Options',
        }
    ]
    const history = createBrowserHistory();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const mobileRef = useRef();
    const profilePhotoRef = useRef();

    const handleSubmit = async e => {
        e.preventDefault();
        var flag = 0
        var profilePhoto, firstName, lastName, email, phone, mobile;
        if (profilePhotoRef.current.files[0]) profilePhoto = profilePhotoRef.current.files[0];
        if (firstNameRef.current.value) firstName = firstNameRef.current.value; else { flag = 1 }
        if (lastNameRef.current.value) lastName = lastNameRef.current.value; else { flag = 1 }
        if (emailRef.current.value) email = emailRef.current.value; else { flag = 1 }
        if (phoneRef.current.value) phone = phoneRef.current.value; else { flag = 1 }
        if (mobileRef.current.value) mobile = mobileRef.current.value; else { flag = 1 }
        if (flag === 1) {
            alert("Check your input and try again")
            return
        }
        var data = new FormData()
        data.append("profilePhoto", profilePhoto)
        data.append("password", "P@ssword1")
        data.append("firstName", firstName)
        data.append("lastName", lastName)
        data.append("email", email)
        data.append("phone", phone)
        data.append("mobile", mobile)
        data.append("gender", gender.value)
        data.append("role", role.value)

        const res = await createUser(data, TokenCxt.token)
        if (res.success) {
            alert("User was created successfully")
            history.go(0)
        }
        else {
            alert(res.message)
        }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <section className='forms'>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h2 style={{ textDecoration: "underline" }}>Add a new user</h2>
                        <div className="row">
                            <div className="col-sm-1">
                                <label className="label" htmlFor="firstName">First Name:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <input className="form-control" ref={firstNameRef} type="text" name="firstname" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="col-sm-1">
                                <label className="label" htmlFor="lastName">Last Name:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <input className="form-control" ref={lastNameRef} type="text" name="lastname" placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <label className="label" htmlFor="profilePhoto">Profile Photo:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <input className="form-control" accept="image/gif, image/jpeg, image/png" ref={profilePhotoRef} type="file" name="profilePhoto" placeholder="Profile Photo" />
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <label className="label" htmlFor="phone">Phone Number:</label>
                            </div>
                            <div className="col-sm-4">
                                <div className="mb-3">
                                    <input className="form-control" ref={phoneRef} type="text" name="phone" placeholder="Phone Number" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <label className="label" htmlFor="gender">Gender:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <Select value={gender}
                                        onChange={(val) => { console.log(val.value); setGender(val) }}
                                        options={[
                                            { value: "Male", label: "Male" },
                                            { value: "Female", label: "Female" },
                                            { value: "Other", label: "Other" }
                                        ]} />
                                </div>
                            </div>
                            <div className="col-sm-1">
                                <label className="label" htmlFor="gender">Role:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <Select value={role}
                                        onChange={(val) => { setRole(val)}}
                                        options={[
                                            { value: 1, label: "Admin" },
                                            { value: 2, label: "Other" },
                                        ]} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <label className="label" htmlFor="email">Email:</label>
                            </div>
                            <div className="col-sm-5">
                                <div className="mb-3">
                                    <input className="form-control" ref={emailRef} type="email" name="email" placeholder="Email" />
                                </div>
                            </div>

                            <div className="col-sm-2">
                                <label className="label" htmlFor="mobile">Mobile Number:</label>
                            </div>
                            <div className="col-sm-4">
                                <div className="mb-3">
                                    <input className="form-control" ref={mobileRef} type="text" name="mobile" placeholder="Mobile Number" />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary w-100" type="submit">
                            Create User
                        </button>
                        <div className="mb-3"></div>
                    </form>
                </section>
                <div className="respTable">
                <h2>Users</h2>
                <BootstrapTable
                    keyField="id"
                    data={uses}
                    columns={columns}
                    bootstrap4
                >
                    
                </BootstrapTable>
            </div>
            </div>
        </div>
    )
}

export default CreateUsersPage