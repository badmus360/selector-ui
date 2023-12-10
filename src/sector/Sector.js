import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Sector = () => {
    const [sectors, setSectors] = useState([]);
  
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
	const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        sector: "",
        category: "",
        product: "",
		skill: "", 
        terms: false,
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9098/api/sector/info");
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
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({...prevData, [name]: type ===
        'checkbox'
        ? checked : value,     
        }));    
        // setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.value,
        // });

        if (e.target.name === "sector") {
            setCategories([])
            await fetchCategories(e.target.value);
        } else if (e.target.name === "category") {
            setProducts([])
            await fetchProducts(e.target.value);
        } else if (e.target.name === "product") {
            setSkills([])
			await fetchSkills(e.target.value);
		}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            console.log("formData", formData);

            const response = await axios.post("http://localhost:9098/api/user/submit", formData);
            if (response) {
                navigate("/users");
            }
            setSubmissionStatus("Form submitted successfully! User ID: " + response.data);
        } catch (error) {
            setSubmissionStatus("Error submitting form.");
        }
    };

    const fetchCategories = async (selectedSector) => {
        try {
            const response = await axios.get(`http://localhost:9098/api/category/categories/${selectedSector}`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProducts = async (selectedCategory) => {
        try {
            const response = await axios.get(`http://localhost:9098/api/product/categories/${selectedCategory}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

	const fetchSkills = async (selectedProduct) => {
		try {
			const response = await axios.get(`http://localhost:9098/api/skill/products/${selectedProduct}`);
			setSkills(response.data);
		} catch (error) {
			console.error("Error fetching skills:", error);
		}
	}

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

                            {categories.length > 0 &&
                            <>
                            <label>Categories</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select category</option>
                                {categories.map((category,index) => (
                                    <option key={index} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            </>}

                           {products.length > 0 && <>
                            <label>Products</label>
                            <select
                                name="product"
                                value={formData.product}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select product</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.name}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            </>}

							{skills.length > 0 && <>
                                <label>Skills</label>
                            <select
                                name="skill"
                                value={formData.skill}
                                onChange={handleInputChange}
                            >
                                <option value={""}>select skill</option>
                                {skills.map((skill, index) => (
                                    <option key={index} value={skill.name}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>
                            </>}

                            {submissionStatus && (
                            <div className="submission-status">{submissionStatus}</div>
                            )}

                                
                            <div className="terms-container">
							<input
								type="checkbox"          
                                value={formData.terms}          
                                onChange={handleInputChange}          
                                id="agreetoterms"          
                                name="terms"
                                
							/>
							<p className="term">Agree to terms</p>
						</div>

                            <button type="submit" disabled={!formData.terms}>Submit</button>
                            <Link to={"/users"} className="link-style">show user</Link>
                        </form>  
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sector;

