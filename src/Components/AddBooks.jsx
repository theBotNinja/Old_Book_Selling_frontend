import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import api from '../api/api';
function AddBooks() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        Name: "",
        description: "",
        price: "",
        minimumBet: "",
        maximumBet: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("Name", formData.Name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("minimumBet", formData.minimumBet);
            data.append("maximumBet", formData.maximumBet);
            if (imageFile) {
                data.append("image", imageFile);
            }

            console.log("Sending FormData with image:", imageFile?.name);
            const res = await api.post("/books", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSubmitted(true);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>📦 Add New Book</h1>
                <p>Hello {user?.name}, add a new book to the collection</p>
            </div>

            <div className="form-card">
                {submitted ? (
                    <div className="success-message">
                        <span className="success-icon">✅</span>
                        <h2>Book Added Successfully!</h2>
                        <p>"{formData.Name || 'The book'}" has been added to the catalogue.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="page-form" encType="multipart/form-data">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="Name">Book Title</label>
                                <input
                                    id="Name"
                                    name="Name"
                                    type="text"
                                    placeholder="Enter book Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price (₹)</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Enter price"
                                    min="1"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="minimumBet">Minimum Bet Amount (₹)</label>
                                <input
                                    id="minimumBet"
                                    name="minimumBet"
                                    type="number"
                                    placeholder="e.g. 1920"
                                    value={formData.minimumBet}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="maximumBet">Maximum Bet Amount (₹)</label>
                                <input
                                    id="maximumBet"
                                    name="maximumBet"
                                    type="number"
                                    placeholder="Enter price"
                                    min="1"
                                    value={formData.maximumBet}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="add-description">Description</label>
                            <textarea
                                id="add-description"
                                name="description"
                                placeholder="Brief description of the book"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-image">Add Photo</label>
                            <input
                                id="add-image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type="submit" className="form-submit">
                            Add Book
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddBooks;
