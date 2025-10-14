import axios from 'axios'
import React ,{useEffect,useState}from 'react'

const Getproduct = () => {
  // initialize three state
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [products,setProducts]=useState([])
  
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
  console.log(products)
  return (
    <div className='row'>
        <h3 className='text-primary text-center'>Available products</h3>
        {/* map over our products and display them */}
        {products.map(product=>(

          <div className='col-md-3 justify-content-center mb-4'>
          {/* card with equal sizes */}
          <div className="card shadow card-margin">
            {/* card image  */}
            <img src="" alt="" />
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <h5>{product.product_category}</h5>
              <h5>{product.product_cost}</h5>
              <h5>{product.product_description}</h5>

            </div>
          </div>

        </div>
        ))}
    </div>
  )
}

export default Getproduct