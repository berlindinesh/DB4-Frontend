import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function FaqPage() {
    const { categoryId } = useParams();
    const [faqs, setFaqs] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({ question: '', answer: '' });
    const [editingFaq, setEditingFaq] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFaqs = useCallback(async () => {
        if (!categoryId) return;

        setLoading(true);
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/faqs/category/${categoryId}`);
            setFaqs(data);
        } catch (err) {
            console.error('Error fetching FAQs:', err);
            setError('Failed to fetch FAQs.');
        } finally {
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingFaq({ ...editingFaq, [name]: value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: newFaq } = await axios.post(`${apiBaseURL}/api/faqs/category/${categoryId}`, formData);
            setFaqs([...faqs, newFaq]); // Optimistic UI update
            setIsAddModalOpen(false);
            setFormData({ question: '', answer: '' });
            setError(null);
        } catch (err) {
            console.error('Error adding FAQ:', err);
            setError('Failed to add FAQ.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: updatedFaq } = await axios.put(`${apiBaseURL}/api/faqs/${editingFaq._id}`, editingFaq);
            setFaqs(faqs.map((faq) => (faq._id === editingFaq._id ? updatedFaq : faq))); // Update UI
            setIsEditModalOpen(false);
            setEditingFaq(null);
            setError(null);
        } catch (err) {
            console.error('Error editing FAQ:', err);
            setError('Failed to edit FAQ.');
        }
    };

    const handleDelete = async (faqId) => {
        try {
            await axios.delete(`${apiBaseURL}/api/faqs/${faqId}`);
            setFaqs(faqs.filter((faq) => faq._id !== faqId)); // Update UI after deletion
            setError(null);
        } catch (err) {
            console.error('Error deleting FAQ:', err);
            setError('Failed to delete FAQ.');
        }
    };

    return (
        <div className="faq-page">
            <h1>FAQs</h1>
            <button onClick={() => setIsAddModalOpen(true)}>Add FAQ</button>

            {loading ? <p>Loading...</p> : null}
            {error ? <p className="error">{error}</p> : null}

            <ul>
                {faqs.map((faq) => (
                    <li key={faq._id}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                        <button onClick={() => { setEditingFaq(faq); setIsEditModalOpen(true); }}>Edit</button>
                        <button onClick={() => handleDelete(faq._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Add FAQ Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add FAQ</h2>
                        <form onSubmit={handleAddSubmit}>
                            <label>
                                Question:
                                <input
                                    type="text"
                                    name="question"
                                    value={formData.question}
                                    onChange={handleAddChange}
                                    required
                                />
                            </label>
                            <label>
                                Answer:
                                <textarea
                                    name="answer"
                                    value={formData.answer}
                                    onChange={handleAddChange}
                                    required
                                />
                            </label>
                            <button type="submit">Add</button>
                            <button type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit FAQ Modal */}
            {isEditModalOpen && editingFaq && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit FAQ</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Question:
                                <input
                                    type="text"
                                    name="question"
                                    value={editingFaq.question}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Answer:
                                <textarea
                                    name="answer"
                                    value={editingFaq.answer}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
