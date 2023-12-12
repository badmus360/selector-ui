import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const customStyles = {
	overlay: {
		background: "rgba(0, 0, 0, .5)",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const Detail = ({ updateModel, setUpdateModel, user , setReload, reload}) => {
	const [products, setProducts] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [skills, setSkills] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        sector: "",
        category: "",
        product: "",
		skill: "", 
        terms: false,
    });

	const closeModal = () => {
		setUpdateModel(false);
	};

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "sector") {
            await fetchCategories(e.target.value);
        } else if (e.target.name === "category") {
            await fetchProducts(e.target.value);
        } else if (e.target.name === "product") {
			await fetchSkills(e.target.value);
		}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.sector) {
            setSubmissionStatus("Please select a sector.");
            return;
        }
    
        if (categories.length > 0 && !formData.category) {
            setSubmissionStatus("Please select a category.");
            return;
        }
    
        if (products.length > 0 && !formData.product) {
            setSubmissionStatus("Please select a product.");
            return;
        }
    
        if (skills.length > 0 && !formData.skill) {
            setSubmissionStatus("Please select a skill.");
            return;
        }    

        try {

            console.log("formData", formData);
            console.log("user?.id", user?.id);

            const response = await axios.put(`https://selector-production.up.railway.app/api/user/update/${user?.id}`, formData);
            if (response) {
                setReload(!reload);
            }
            setSubmissionStatus("Form submitted successfully! User ID: " + response.data);
        } catch (error) {
            setSubmissionStatus("Error submitting form.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://selector-production.up.railway.app/api/sector/info");
                const sectorNames = response.data;

                setSectors(sectorNames);
            } catch (error) {
                console.error("Error fetching sectors data:", error);
            }
        };

        fetchData();
    }, []);

    const fetchCategories = async (selectedSector) => {
        try {
            const response = await axios.get(`https://selector-production.up.railway.app/api/category/categories/${selectedSector}`);
            setCategories(response.data);
            setProducts([]); // Reset products when changing categories
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProducts = async (selectedCategory) => {
        try {
            const response = await axios.get(`https://selector-production.up.railway.app/api/product/categories/${selectedCategory}`);
            setProducts(response.data);
			setSkills([]);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

	const fetchSkills = async (selectedProduct) => {
		try {
			const response = await axios.get(`https://selector-production.up.railway.app/api/skill/products/${selectedProduct}`);
			setSkills(response.data);
		} catch (error) {
			console.error("Error fetching skills:", error);
		}
	}

	return (
		<Modal
			isOpen={updateModel}
			onRequestClose={closeModal}
			style={customStyles}
			ariaHideApp={false}
		>
            <form className="form" onSubmit={handleSubmit}>
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


            <button type="submit">Update</button>

            </form>
		</Modal>
	);
};

export default Detail;
