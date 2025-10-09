import React, { useState } from 'react';

const AddProduct = () => {

  const [formData, setFormData] = useState({
    productname: '',
    productdescription: '',
    productcategory: '',
    productcost: '',
  });

  const [productPhoto, setProductPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProductPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

   

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Upload Products</legend>

          <input
            type="text"
            name="productname"
            value={formData.productname}
            required
            placeholder="Enter Product Name"
            onChange={handleChange}
            className="rounded px-2 w-100 py-2"
          /> <br /><br />

          <input
            type="text"
            name="productdescription"
            value={formData.productdescription}
            required
            placeholder="Describe your Product"
            onChange={handleChange}
            className="rounded px-2 w-100 py-2"
          /> <br /><br />

          <input
            type="text"
            name="productcategory"
            value={formData.productcategory}
            required
            placeholder="Enter Product Category"
            onChange={handleChange}
            className="rounded px-2 w-100 py-2"
          /> <br /><br />

          <input
            type="number"
            name="productcost"
            value={formData.productcost}
            required
            placeholder="Enter Product Cost"
            onChange={handleChange}
            className="rounded px-2 w-100 py-2"
          /> <br /><br />

          <label htmlFor="productimage" className="text-center fw-bold fs-5">
            Browse/Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="rounded px-2 w-100 py-2 "
          /> <br /><br />

          <button type="submit" className="btn btn-primary rounded py-2 w-100">
            Upload Product
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddProduct;
