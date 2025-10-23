import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Getproduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  // Sorting/filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection,setSortDirection]=useState("")
  const [sortByField, setSortByField] = useState("product_cost");
  const [selectedCategory, setSelectedCategory] = useState("All");


  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';

  // Fetch products
  const getproducts = async () => {
    setLoading("Please wait...");
    try {
      const response = await axios.get("https://doreen98.pythonanywhere.com/api/get_product_details");
      setProducts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    getproducts();
  }, []);
  
  // extract the categories
  const categories = ["All Categories", ...new Set(products.map(p => p.product_category))];


  // Apply filtering and sorting
  const filteredProducts = products
    .filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All Categories" || product.product_category === selectedCategory)
    )
    .sort((a, b) => {
     
    
      const aValue = a[sortByField];
      const bValue = b[sortByField];
    
      if (typeof aValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
    });
    

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setSortDirection("")
    setSelectedCategory("All Categories")
    setSortByField("product_cost");
  };

  return (
    <div className='container-fluid'>
      <h3 className='text-primary text-center p-2'>Available products</h3>
      <h4 className="text-info">{loading}</h4>
      <h4 className="text-danger">{error}</h4>

      {/* Filters */}
      <div className="row p-4">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: "35px", width: "100%", padding: "10px" }}
          />
        </div>
        <div className="col-md-2">
              <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
             >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
          className="form-select"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
            >
          <option value="">Price</option>
          <option value="desc">Highest Price</option>
          <option value="asc">Lowest Price</option>
        </select>
      </div>

      <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "az" || value === "za") {
                setSortByField("product_name");
                setSortDirection(value === "az" ? "asc" : "desc");
              } else {
                setSortByField("product_cost");
                setSortDirection(""); // Default to no sorting
              }
            }}
          >
            <option value="">Sort by Name</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-dark w-100" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Product list */}
      <div className='row p-4'>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-muted">No products found.</div>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={product.id || index} className='col-md-3 d-flex align-items-stretch justify-content-center mb-4'>
              <div className="card shadow card-margin h-100">
                <img
                  src={imagepath + product.product_photo}
                  alt={product.product_name}
                  className='mt-4 productimage'
                />
                <div className="card-body">
                  <h4 className='text-primary fw-bold'>{product.product_name}</h4>
                  <h5 className='text-warning fst-italic'>
                    <span className="fw-semibold text-dark">Category: </span>{product.product_category}
                  </h5>
                  <p>
                    <span className="fw-semibold">Description: </span>
                    {product.product_description.slice(0, 100)}...
                  </p>
                  <h4 className='text-danger'>
                    <span className="fw-semibold">Price: </span> KSH.{product.product_cost}
                  </h4>
                  <button
                    onClick={() => navigate("/mpesapayment", { state: { product } })}
                    className='btn btn-dark w-100 mt-2'
                  >
                    Purchase now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Getproduct;
