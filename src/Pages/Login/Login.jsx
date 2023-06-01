import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {

    const [disable, setDisable] = useState(true)
    const captchaRef = useRef();
    const {signIn} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const onSubmit = data => {
  
      signIn(data.email,data.password)
      .then(result => {
        const user = result.user;
        Swal.fire({
            title: `Welcome back, ${user?.displayName}`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        navigate(from, { replace: true });
    })
    };

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

    const validate = () =>{

 if (captchaRef.current.value.length == 6 && validateCaptcha(captchaRef.current.value)==true) {
        setDisable(false)
     }else{
        setDisable(true)
     }
    }

    
   

  return (
    <div className="hero min-h-[80vh] bg-base-200">
  <div className="hero-content flex-col lg:flex-row">

    <div className="text-center lg:text-left w-full md:w-1/2">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    
    <form onSubmit={handleSubmit(onSubmit)} className='w-2/5'>
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" {...register("email", { required: true })}/>
        </div>
       
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" {...register("password", { required: true })}/>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
       

        <div className="form-control">
        <div><LoadCanvasTemplate className="bg-zinc-200"/></div>
          <label className="label">
            <span className="label-text">Captcha</span>
          </label>
          <input type="text" placeholder="captcha" name="captcha" className="input input-bordered w-64 mb-2" ref={captchaRef} onChange={validate} required/>
          {disable? <p className='text-red-600'>fill out the captcha</p>: <p className='text-indigo-600'>matched</p>}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-warning" type='submit' disabled={disable}>Login</button>
        </div>
        <div className="form-control">
          <Link to='/register' className="text-zinc-600 hover:text-zinc-800 text-lg my-4 cursor-pointer" type='submit'>Don't have an account? Register</Link>
        </div>
      </div>
    </div>
    </form>


  </div>
</div>
  )
}

export default Login