import React from 'react'
import { useAuth } from '../Context/AuthContext';
import api from '../api/api';
import { useState, useEffect } from 'react';
export default function MyBets() {
    const [bets, setBets] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const fetchBets = async () => {
            try {
                const res = await api.get(`/bet/user/${user._id}`);
                setBets(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBets();
    }, [user._id]);
    console.log(bets)
    return (<>
        <div style={{ margin: "10%" }}>
            <h1 className='text-2xl font-bold'>Bid List</h1>
            {bets.map((bet) => (
                <div key={bet._id} style={{ margin: "1%", border: "1px solid #555555ff", padding: "1%", borderRadius: "10px", backgroundColor: bet.status === "won" ? "#d0ffe1ff" : "#fdf7ffff" }}>
                    <p>Book: <span className='font-bold'>{bet.BookName}</span></p>
                    <p>Amount: <span className='font-bold'>₹{bet.BetAmount}</span></p>
                    <p>Status: <span className='font-bold'>{bet.status}</span></p>
                </div>
            ))}
        </div>
    </>
    )
}
