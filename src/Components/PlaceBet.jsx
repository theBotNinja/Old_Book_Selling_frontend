import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useParams } from 'react-router-dom';
import api from '../api/api';
function PlaceBet() {
    const { user } = useAuth();
    const { id } = useParams();
    const [value, setValue] = useState(50);
    const [book, setBook] = useState({
        Name: "",
        description: "",
        price: "",
        betOn: "",
        image: "",
        minimumBet: "",
        maximumBet: ""

    });
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await api.get(`/books/${id}`);
                setBook(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBook();
    }, [id]);

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/bet/${user._id}/${id}/${value}`);
            if (res.status === 200) {
                setSubmitted(true);
            }
        } catch (error) {
            console.log(error.response.data)
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>🎯 Place a Bet</h1>
                <p>Hey {user?.name}, place your bet on a book!</p>
            </div>

            <div className="form-card">
                {submitted ? (
                    <div className="success-message">
                        <span className="success-icon">✅</span>
                        <h2>Bet Placed Successfully!</h2>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="page-form">
                        <div className="form-group">
                            <label htmlFor="bookTitle">Book Title</label>
                            <label htmlFor="bookTitle">{book.Name}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <label htmlFor="description">{book.description}</label>

                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Bet Amount (₹ {value})</label>
                            <input
                                type="range"
                                min={book.minimumBet}
                                max={book.maximumBet}
                                step="1"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="form-submit">
                            Place Bet
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PlaceBet;
