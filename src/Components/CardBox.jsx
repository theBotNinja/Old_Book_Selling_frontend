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
            <h3>{props.userid}</h3>
            <p className="bet-author">MRP: ₹{props.betamount}
                <br />
                {props.bookname}</p>
            {userdetails && (
                <div>
                    <p>{userdetails.name}</p>
                    <p>{userdetails.email}</p>
                    <p>{userdetails.mobileNumber}</p>
                </div>
            )}
        </div>
    )
}
