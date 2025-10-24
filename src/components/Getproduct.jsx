import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Getproduct = () => {
  const navigate = useNavigate();

  // Posting states
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  // Sorting/filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [sortByField, setSortByField] = useState("product_cost");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  // Extract categories
  const categories = ["All Categories", ...new Set(products.map(p => p.product_category))];

  // Filter + Sort logic
  const filteredProducts = products
    .filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All Categories" || product.product_category === selectedCategory)
    )
    .sort((a, b) => {
      const aValue = a[sortByField];
      const bValue = b[sortByField];

      if (sortDirection === "") return 0; // no sorting

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

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset filters
  const handleReset = () => {
    setSearchTerm("");
    setSortDirection("");
    setSelectedCategory("All Categories");
    setSortByField("product_cost");
  };

  // reset pagination on search 
  const handleSearch = (e)=>{
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';

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
            onChange={handleSearch}
            style={{ height: "35px", width: "100%", padding: "10px" }}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
            }}
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
            onChange={(e) => {
              setSortDirection(e.target.value)
              setCurrentPage(1)
            }}
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
                setCurrentPage(1)
              } else {
                setSortByField("product_cost");
                setSortDirection("");
              }
            }}
          >
            <option value="">Sort by Name</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-dark w-100" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Product list */}
      <div className='row p-4'>
        {currentItems.length === 0 ? (
          <div className="text-center text-muted">No products found.</div>
        ) : (
          currentItems.map((product, index) => (
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

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Getproduct;
