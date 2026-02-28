import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Books() {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await api.get("/books");
                setBooks(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>📚 Collection</h1>
                <p></p>
            </div>

            <div className="books-grid">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <div className={`book-card-cover`} style={{ backgroundImage: `url(${book.image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            {book.image === "link" ? <span className="book-emoji" >📖</span> : <span ></span>}
                        </div>
                        <div className="book-card-info">
                            <h3 >{book.Name}</h3>
                            <p className="book-author"><span className="font-bold text-neutral-500">
                                MRP: ₹{book.price}
                            </span>
                                <br />
                                {book.description}</p>
                            <div className="book-meta">
                                <span >
                                    {user &&
                                        (user.role === "admin") ? (<>
                                            <button className="bg-blue-300 hover:bg-blue-400 active:bg-blue-800 p-1 rounded-lg mr-2 " onClick={() => navigate(`/betslist/${book._id}`)}>See Bets list</button>
                                            <button className="bg-red-300 hover:bg-red-400 active:bg-red-800 p-1 rounded-lg " onClick={() => {
                                                const deleteBook = async () => {
                                                    try {
                                                        await api.delete(`/books/delete/${book._id}`);
                                                        setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
                                                    } catch (err) {
                                                        console.error(err);
                                                    }
                                                };
                                                deleteBook();
                                            }}>Delete</button>
                                        </>
                                    ) : (
                                        <button className="bg-blue-300 hover:bg-blue-400 active:bg-blue-800 p-1 rounded-lg " onClick={() => navigate(`/bets/${book._id}`)}>Place Bid</button>
                                    )
                                    }
                                </span>
                                <span className="book-price">Starts At: ₹{book.maximumBet}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
