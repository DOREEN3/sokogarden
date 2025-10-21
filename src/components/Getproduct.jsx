import axios from 'axios'
import React ,{useEffect,useState}from 'react'
import { useNavigate } from 'react-router-dom'


const Getproduct = () => {
  let navigate=useNavigate() 

  // initialize three state
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [products,setProducts]=useState([])
  //initialize state for sorting
  const [searchTerm,setSearchTerm]=useState("")
  const [sortOrder,setSordOrder]=useState("")
  
  // function to fetch products
  const getproducts=async()=>{
    setLoading("Please wait...")

    try {
      const response=await axios.get("https://doreen98.pythonanywhere.com/api/get_product_details")
      setProducts(response.data)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  useEffect(()=>{
    getproducts()
  },[])

  // check if we have products

  const imagepath='https://doreen98.pythonanywhere.com/static/images/'

  return (
    <div className='container-fluid'>
      <h3 className='text-primary text-center p-2'>Available products</h3>
      <div className="row p-4">
        <div className="col-md-3">
          <input type="text" placeholder='Search by name' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} style={{height:"35px", width:"100%" , padding:"10px"}} />
        </div>
        <div className="col-md-3">
       <select name="category" id="category" className='w-100' style={{height:"35px"}}>
        <option value="categories">All categories</option>
        <option value="product_name">Product Name</option>
        <option value="product_cost">Product Cost</option>
       </select>
        </div>
        <div className="col-md-2">
          <select name="min price" id="min price" value={sortOrder} className='w-100' style={{height:"35px"}}>
            <option value="product_cost">Min Price</option>
          </select>
        </div>
        <div className="col-md-2 " >
          <select name="max" id="max" value={sortOrder} className='w-100' style={{height:"35px"}}>
            <option value="product_cost" >Max Price</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className='btn btn-dark w-100'>Reset</button>
        </div>
      </div>
    <div className='row p-4 '>

        {/* map over our products and display them */}
        {products.map(product=>(

          <div className='col-md-3 d-flex align-items-stretch justify-content-center mb-4'>
          {/* card with equal sizes */}
          <div className="card shadow card-margin h-100">
            {/* card image  */}
            <img src={imagepath + product.product_photo} alt={product.product_name} className='mt-4 productimage' />
            <div className="card-body  ">
              <h4 className='text-primary fw-bold'>{product.product_name}</h4>
              <h5 className='text-warning fst-italic'><span className="fw-semibold text-dark">Product Category: </span>{product.product_category}</h5>
              
              <p><span className="fw-semibold">Product Description: </span>{product.product_description.slice(0,100)}</p>
              <h4 className='text-danger'><span className="fw-semibold">Price: </span> KSH.{product.product_cost}</h4>
              <button onClick={()=>navigate("/mpesapayment", {state : {product}})} className='btn btn-dark w-100 mt-2'>Purchase now</button>

            </div>
          </div>

        </div>
        ))}
    </div>
    </div>
  )
}

export default Getproduct