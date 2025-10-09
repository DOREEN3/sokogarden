import axios from 'axios'
import React , {useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'

const Signin = () => {
  let navigate= useNavigate()

  // initialize the state 
  const [formData,setFormData]=useState({
    email : "",
    password : ""
  })

//  state for posting data
  const  [loading,setLoading]=useState("")
  const [success,setSuccess]=useState('')
  const [error,setError]=useState("")

// function to signin 
  const handleSubmit=async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")
    // define an empty envelope
    const envelopedata=new FormData()
    // append our data
    envelopedata.append('email', formData.email)
    envelopedata.append('password', formData.password)
   
    try {
      const response = await axios.post("https://doreen98.pythonanywhere.com/api/signin",envelopedata)
      setSuccess(response.data.message)
      // redirect the user upon success login
      // we check if user exist
      if (response.data.user){
        navigate("/")
      }
      // save user to localStorage
      localStorage.setItem('user', response.data.user)
      // reset
      setLoading("")

    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>

      <form onSubmit={handleSubmit} className="shadow border rounded p-4 w-50">
        <fieldset>
          <legend className="text-center fw-bold fs-3">Sign In</legend>
          {/* bind variables */}
          <h1 className='text-info'>{loading}</h1>
          <h1 className='text-success'>{success}</h1>
          <h1 className='text-danger'>{error}</h1>
         

          <input type="email"
          name='email'
          value={formData.email} 
          required
          placeholder='Email'
          onChange={handleChange}
          className="rounded px-2 w-100 py-2 "/> <br /><br />

          <input type="password"
          name='password'
          value={formData.password} 
          placeholder='Password'
          required
          onChange={handleChange}
          className="rounded px-2 w-100 py-2 "/> <br /><br />

          <button type='submit' className="btn btn-primary rounded py-2 w-100">Sign In</button>
          <p className="fw-bold mt-2 mx-4 fs-5">Don't have an account ?
            <Link to="/signup">Sign Up</Link>
          </p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signin