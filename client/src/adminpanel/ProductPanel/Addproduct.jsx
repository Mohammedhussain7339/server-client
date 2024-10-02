import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addproduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userRole") !== "admin") {
            alert("Please login as admin first.");
            navigate("/");
        } else {
            fetchData(); // Fetch data only if user is admin
        }
    }, []); // Empty dependency array means this effect runs only once on mount

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/productfetch");
            setProducts(response.data.products);
            console.log(response.data.products);
            console.log('this is img', response.data.products.map(product => product.productImage));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        // Fetch initial product data when the component mounts
        fetchData();
    }, []);

    const [Product, setProduct] = useState({
        productName: "",
        productPrice: "",
        productDescription: "",
        productType: "",
        colorType: "",
        brand: ""
    });

    const handleInputChange = (e) => {
        setProduct({ ...Product, [e.target.name]: e.target.value });
        console.log(Product);
    };

    const [productImage, setProductImage] = useState([]);

    const handleImageChange = (e) => {
        setProductImage(e.target.files);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("productName", Product.productName);
            formData.append("productPrice", Product.productPrice);
            formData.append("productDescription", Product.productDescription);
            formData.append("productType", Product.productType);
            formData.append("colorType", Product.colorType);
            formData.append("brand", Product.brand);
            
            Array.from(productImage).forEach((item) => {
                formData.append("productsimg", item);
            });

            const response = await axios.post(
                "http://localhost:8000/product1",
                formData,
            );
            toast.success('Product is successfully uploaded');
            console.log(response.data);

            // Fetch updated product list after successful upload
            fetchData();

            // Clear the input fields
            setProduct({
                productName: "",
                productPrice: "",
                productDescription: "",
                productType: "",
                colorType: "",
                brand: ""
            });
            setProductImage([]); // Clear the images
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    };
    return (
        <>
            <h1>MERN Product App</h1>
            <div>
                <h2>Add New Product</h2>
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={Product.productName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="productPrice"
                    placeholder="Product Price"
                    value={Product.productPrice}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="productDescription"
                    placeholder="Product Description"
                    value={Product.productDescription}
                    onChange={handleInputChange}
                />
                {
                    Array.from(productImage).map(item => (
                        <span key={item.name}>
                            <img
                                style={{ padding: '10px' }}
                                width={150} height={100}
                                src={item ? URL.createObjectURL(item) : null} />
                        </span>
                    ))
                }
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                <select
                    className="selectinput"
                    name="productType"
                    value={Product.productType}
                    onChange={handleInputChange}>
                    <option value="">Select Product Type</option>
                    <option value="Chair">Chair</option>
                    <option value="Table">Table</option>
                    <option value="Lalten">Lalten</option>
                    <option value="Sofa">Sofa</option>
                    <option value="FlowerPort">FlowerPort</option>
                </select><br />
                <select
                    className="selectinput"
                    name="colorType"
                    value={Product.colorType}
                    onChange={handleInputChange}>
                    <option value="">Select Color Type</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Green">Green</option>
                </select><br />
                <select
                    className="selectinput"
                    name="brand"
                    value={Product.brand}
                    onChange={handleInputChange}>
                    <option value="">Select Brand Type</option>
                    <option value="Godrej Interio">Godrej Interio</option>
                    <option value="Zuari Furniture">Zuari Furniture</option>
                    <option value="Durian">Durian</option>
                    <option value="Damro">Damro</option>
                    <option value="IKEA">IKEA</option>
                    <option value="Wipro Furniture">Wipro Furniture</option>
                    <option value="Samsung Furniture">Samsung Furniture</option>
                </select><br />
                <button className="uploadbtn" onClick={handleUpload}>Upload Product</button>
            </div>
            <ToastContainer />
        </>
    )
}

export default Addproduct;
