import React ,{useState} from 'react'
import { useLocation } from 'react-router-dom'


const Mpesapayment = () => {
  // we use uselocation to retrive our product 
  const {product} =useLocation().state ||  {};
  const imagepath='https://doreen98.pythonanywhere.com/static/images/'

 
  const  [loading,setLoading]=useState("")
  const [success,setSuccess]=useState('')
  const [error,setError]=useState("")

   // function to make payment 
  const handleSubmit= async (e)=>{
    e.preventDefault()
    alert("My mpesa payment")

  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card p-4 shadow">
        <h1 className='text-info text-center'>Lipa Na Mpesa</h1>
      <img src={imagepath + product.product_photo} alt={product.product_name} className='mt-4 productimage' />
      <div className="card-body  ">
              <h4 className='text-primary fw-bold'>{product.product_name}</h4>
              <h5 className='text-warning fst-italic'><span className="fw-semibold text-dark">Product Category: </span>{product.product_category}</h5>
              
              <p><span className="fw-semibold fs-5">Product Description: </span>{product.product_description.slice(0,100)}</p>
              <h4 className='text-danger fs-5'><span className="fw-semibold">Price: </span> KSH.{product.product_cost}</h4>

              <form onSubmit={handleSubmit}>
                  <input type="tel" placeholder='Enter phone 254xxxxx' className='form-control fs-5' />
              <button className='btn btn-dark w-100 mt-2'>Purchase now</button>
              </form>

            </div>
      </div>
    </div>
  )
}

export default Mpesapayment