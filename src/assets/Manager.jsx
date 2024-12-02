import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const [showPass, setShowPass] = useState(true)
    const [passwordArray, setPasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    const [form, setForm] = useState({
        site: "",
        useName: "",
        password: ""
    })

    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setForm({
            site: "",
            useName: "",
            password: ""
        })
    }

    const deletPassword = (id) => {

        console.log("Delete Password", id)
        let conf = confirm("Do you want to delete")
        if (conf) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => { item.id !== id })))
        }
    }

    const editPassword = (id) => {
        console.log("editPassword Password", id)
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id === id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
    }
    const handlePass = () => {
        if (showPass === true) {
            setShowPass(false)
        } else {
            setShowPass(true)
        }
    }

    const copyText = (text) => {
        toast(`Copid ${text}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        navigator.clipboard.writeText(text)
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {/* Same as */}
            <ToastContainer />


            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className="container m-auto     w-10/12 p-7 rounded-md mt-5 text-center"><br />
                <h1 className='text-6xl font-bold'>&nbsp;Password<span className='text-blue-600'>Manager</span> &nbsp;</h1>
                <p className='text-2xl mt-4'>Your Password Manager</p><br /><br />
                <div className='text-center w-10/12 m-auto'>
                    <p className='w-full mt-2'>
                        <input name='site' className='w-full m-2 p-3 rounded-md border-2 border-blue-600' value={form.site} placeholder='Enter Your Password URL' onChange={onChange} type="text" />
                    </p>
                    <p className='w-full flex justify-center mt-2 m-auto'>
                        <input name='useName' className='w-8/12 mx-2  p-3 rounded-md border-2 border-blue-600' value={form.useName} onChange={onChange} placeholder='Enter Your Username' type="text" />
                        <div className='relative w-4/12'>

                            <input className='w-full   p-3 rounded-md border-2 border-blue-600' name='password' value={form.password} onChange={onChange} placeholder='Enter Your Password' type={showPass ? "password" : "text"} />
                            <span className="absolute right-2 cursor-pointer top-3  " onClick={handlePass}>

                                {!showPass ?
                                    <FontAwesomeIcon icon={faEye} /> :
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                }
                            </span>
                        </div>
                    </p><br /><br />
                    <button disabled={form.password.length === 0} onClick={savePassword} className='border-2 flex justify-center  items-center m-auto bg-blue-600 w-2/12 font-bold text- 1xl text-white p-4 rounded-md'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            state="in-add-card"
                            style={{ width: "20px", height: "20px", color: "white" }}
                        >
                        </lord-icon>  <p className='m-3'>Save</p></button>
                </div>
            </div>

            <div className='text-center m-5'>
                <h1 className='text-2xl font-bold '>Your Passord</h1>
                {passwordArray.length === 0 && <div>No Password to Show</div>}
                {passwordArray.length != 0 &&
                    <table className="table-auto text-start bg-blue-200  m-auto w-10/12">
                        <thead className='text-start'>
                            <tr className='bg-blue-600 text-white rounded-md'>
                                <th className='text-start p-2 w-7/12'>Site</th>
                                <th className='text-start w-3/12'>Username</th>
                                <th className='text-start w-2/12'>Password</th>
                                <th className='text-start w-2/12'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr className='p-5' key={index}>

                                    <td className='p-5 flex items-center'><a href={item.site} target='blank'>{item.site}</a>
                                        <button className='loadicon cursor-pointer text-sm ml-3' onClick={() => { copyText(item.site) }}><lord-icon
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover"
                                            style={{ width: "20px", height: "20px" }}
                                        >
                                        </lord-icon></button> </td>
                                    <td>{item.useName} <button className='loadicon cursor-pointer text-sm ml-3' onClick={() => { copyText(item.useName) }}><lord-icon
                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}
                                    >
                                    </lord-icon></button> </td>
                                    <td>{item.password}<button className='loadicon cursor-pointer text-sm ml-3' onClick={() => { copyText(item.password) }}><lord-icon
                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                        trigger="hover"
                                        style={{ width: "20px", height: "20px" }}
                                    >
                                    </lord-icon></button> </td>
                                    <td>
                                        <div className='font-bold  flex  cursor-pointer'>
                                            <button className='mx-2' onClick={() => { deletPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                            <button className='mx-2' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wvdxdmpi.json"
                                                    trigger="hover"
                                                    style={{ width: "20px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
            </div>

        </div >
    )
}

export default Manager
