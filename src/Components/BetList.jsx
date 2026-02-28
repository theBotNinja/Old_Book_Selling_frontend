import React from 'react'
import api from '../api/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardBox from './CardBox'
export default function BetList() {
    const [bets, setBets] = useState([]);
    const [userdetails, setUserdetails] = useState(null);
    const { bookId } = useParams();
    useEffect(() => {
        const fetchBets = async () => {
            try {
                const res = await api.get(`/bet/${bookId}`);
                setBets(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBets();
    }, []);
    return (
        <div className='m-8 p-10'>
            <h1>BetList</h1>
            <div className="flex flex-col m-2 p-4">
                {bets.map((bet) => (
                    <CardBox key={bet._id} userid={bet.User} betamount={bet.BetAmount} bookname={bet.bookName} />
                ))}
            </div>
        </div>
    )
}
