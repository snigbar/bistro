import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form';
import { Link } from 'react-scroll';
import { AuthContext } from '../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';


const SignUp = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = data => {

    createUser(data.email, data.password)
        .then(result => {

            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    const saveUser = { name: data.name, email: data.email }
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: `Thank you, ${data.name}`,
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                                navigate('/');
                            }
                        })



                })
                .catch(error => console.log(error))
        })
};



  return (
   <>
    <Helmet>
        <title>Bistro Boss | Sign Up</title>
    </Helmet>
    
    <div className="hero min-h-[70vh] bg-base-200">
  <div className="hero-content flex-col lg:flex-row">

    <div className="text-center lg:text-left w-full md:w-1/2">
      <h1 className="text-5xl font-bold">Register</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    
    <form onSubmit={handleSubmit(onSubmit)} className='w-2/5'>
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name="name" className="input input-bordered" {...register("name", { required: true })}/>
        {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" placeholder="Photo Url" name="photo" className="input input-bordered" {...register("photo", { required: true })}/>
        {errors.photo && <span className="text-red-600 text-sm">Photo Url is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" {...register("email", { required: true })}/>
        {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" 
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
        })}/>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        {errors.password?.type === 'required' && <p className="text-red-600 text-sm">Password is required</p>}
        {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm">Password must be 6 characters</p>}
        {errors.password?.type === 'maxLength' && <p className="text-red-600 text-sm">Password must be less than 20 characters</p>}
        {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm">Password must have one Uppercase one lower case, one number and one special character.</p>}
        </div>



        <div className="form-control mt-6">
          <button className="btn btn-warning" type='submit'>Register</button>
        </div>
        <div className="form-control">
          <Link to='/login' className="text-zinc-600 hover:text-zinc-800 text-lg my-4 cursor-pointer" type='submit'>Already have an account? Login</Link>
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
    </form>


  </div>
</div>
   </>
  )
}

export default SignUp