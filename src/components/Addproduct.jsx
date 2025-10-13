import axios from 'axios';
import React, { useState } from 'react';


const AddProduct = () => {

  const [formData, setFormData] = useState({
    productname: '',
    productdescription: '',
    productcategory: '',
    productcost:'',
  });

  const [productPhoto, setProductPhoto] = useState(null);
  
  // define 3 state to post data
  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")
  
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

  //function to add products
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...")

    // define empty envelope
    const envelopedata=new FormData()

    // append data
    envelopedata.append("product_name",formData.productname)
    envelopedata.append("product_description",formData.productdescription)
    envelopedata.append("product_category",formData.productcategory)
    envelopedata.append("product_cost",formData.productcost)
    envelopedata.append("product_photo",productPhoto)

    //post data
    try {
      const response=await axios.post("https://doreen98.pythonanywhere.com/api/add_product",envelopedata)
      setSuccess(response.data.message)
      //reset loading
      setLoading("")
    } catch (error) {
      setError(error.message)
      //reset loading
      setLoading("")
    }
  }

   

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Upload Products</legend>

          {/* binding the usestate */}
          <h2 className='text-warning'>{loading}</h2>
          <h2 className='text-success'>{success}</h2>
          <h2 className='text-danger'>{error}</h2>
          
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
