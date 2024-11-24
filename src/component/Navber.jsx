import React from "react";
import foodPanda from '../Images/foodPanda Logo.png'
import ShopingBag from '../Images/add-to-bag.png'
import { NavLink } from "react-router-dom";
import Body from "./Body";
import { auth } from "../config.js/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { tab } from "@testing-library/user-event/dist/tab";
import MiniCard from "./MiniCard";


function Navber() {
    const [log, setLog] = useState(false)
    const [showCart, setShowCart] = useState(false)

    const [user, setUser] = useState()
    const card = useSelector(state => state.card)
    useEffect(() => {
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setUser(users.email)
                setLog(true)

            } else {


            }
        });

    }, [])


    const handleSignOut = async () => {
        Swal.fire({
            title: "Are you sure You won Log Out",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Log Out!",
                    text: "Your Log Out successfully",
                    icon: "success"
                });
                try {
                    signOut(auth)
                    setLog(false)
                    setUser()
                    // Swal.fire("Log Out")


                } catch (e) {
                    Swal.fire(e.message)

                }

            }
        });

    }

    
    return (
        <>


            <div className="nav">
                <ul >
                    {/* <li className="user" >
                        <NavLink to={"/signIn"}>
                            <img src={User} width={20} />
                        </NavLink>
                    </li> */}
                    <li className="logo" >
                        <NavLink>
                            <img src={foodPanda} />
                        </NavLink>
                    </li>
                    <li className="signUpBtn">
                        <i>{user}</i>

                    </li>

                    {!log ? <li className="loginBtn">
                        <NavLink to={"/signIn"}>
                            <button>Log in</button>
                        </NavLink>
                    </li>
                        : <li className="loginBtn">

                            <button onClick={handleSignOut} >Logout</button>

                        </li>}
                    {/* <li className="list1" >
                        <img src={Globle} width={23} /> <span>EN</span>
                    </li> */}
                    <li onClick={() => setShowCart(!showCart)} className="list">

                        <NavLink to={"/TotalItem"}> <img src={ShopingBag} width={25} /></NavLink>
                        {/* <img src={ShopingBag} width={25} /> */}
                        {card.length}
                        {showCart && <div>
                            {/* <MiniCard /> */}
                        </div>}

                    </li>
                </ul>


            </div>

            <Body />


        </>
    )
}

export default Navber