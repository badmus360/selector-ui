import React, { useEffect, useState } from "react";
import axios from "axios";

const Sector = () => {
    const [sectors, setSectors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        sector: "",
        category: "",
        product: "", 
        terms: false,
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9098/api/sectors/info");
                const sectorNames = response.data;

                setSectors(sectorNames);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sectors data:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "sector") {
            await fetchCategories(e.target.value);
        } else if (e.target.name === "category") {
            await fetchProducts(e.target.value);
        }
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9098/api/sectors/submit", formData);
            setSubmissionStatus("Form submitted successfully!");
        } catch (error) {
            setSubmissionStatus("Error submitting form.");
        }
    };

    const fetchCategories = async (selectedSector) => {
        try {
            const response = await axios.get(`http://localhost:9098/api/sectors/categories/${selectedSector}`);
            setCategories(response.data);
            setProducts([]); // Reset products when changing categories
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProducts = async (selectedCategory) => {
        try {
            const response = await axios.get(`http://localhost:9098/api/products/categories/${selectedCategory}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };




    return (
        <div className="wrapper">
            <div className="container">
                <div className="form-container">
                    <h2 className="h2">Sector form</h2>
                    <p className="title">
                        Please enter your name and pick the Sectors you are currently involved in.
                    </p>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <form className="form" onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <label>Sectors</label>
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select sector</option>
                                {sectors.map((sector, index) => (
                                    <option key={index} value={sector}>
                                        {sector}
                                    </option>
                                ))}
                            </select>
                            <label>Categories</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <label>Products</label>
                            <select
                                name="product"
                                value={formData.product}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select product</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleCheckboxChange}
                                />
                                <p className="term">Agree to terms</p>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            </div>
            {submissionStatus && (
                <div className="submission-status">{submissionStatus}</div>
            )}
        </div>
    );
};

export default Sector;

