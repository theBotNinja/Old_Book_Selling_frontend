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
        <div style={{ margin: "15%" }}>
            {bets.map((bet) => (
                <div key={bet._id} style={{ margin: "1%", border: "1px solid #555555ff", padding: "1%", borderRadius: "10px", backgroundColor: bet.status === "won" ? "#d0ffe1ff" : "#fdf7ffff" }}>
                    <p>Book: {bet.BookName}</p>
                    <p>Amount: {bet.BetAmount}</p>
                    <p>Status: {bet.status}</p>
                </div>
            ))}
        </div>
    </>
    )
}
