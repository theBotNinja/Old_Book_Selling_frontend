import React from 'react'
import api from '../api/api'
import { useState } from 'react';
export default function CardBox(props) {
    const [userdetails, setUserdetails] = useState(null);
    console.log(userdetails);
    return (
        <div onClick={() => {
            const fetchUserDetails = async () => {
                try {
                    const res = await api.get(`/user/${props.userid}`);
                    setUserdetails(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchUserDetails();

        }} className="bet-card p-2 m-2 rounded-lg bg-slate-200">
            <h3> User ID : <span className='font-bold'>{props.userid}</span></h3>
            <p className="bet-author">Bid Amount :<span className='font-bold'> ₹{props.betamount}</span>
            </p>
            {userdetails && (
                <div>
                    <p>Name: {userdetails.name}</p>
                    <p>Email: {userdetails.email}</p>
                    <p>Mobile Number: {userdetails.mobileNumber}</p>
                </div>
            )}
        </div>
    )
}
