import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddItem = () => {

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${hosting_token}`

    const onSubmit = data => {
        
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, price, category, recipe} = data;
                const newItem = {name, price: parseFloat(price), category, recipe, image:imgURL}
                console.log(newItem)
                axiosSecure.post('/menu', newItem)
                .then(data => {
                    console.log('after posting new menu item', data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })

    };

  return (
    
    <div className='mx-auto h-full'>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-4 ms-4 lg:hidden">Open drawer</label>
    <h1 className='text-4xl text-center text-zinc-800 font-bold leading-[4rem] my-6'>Add Item</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
            <label className="label">
                <span className="label-text font-semibold">Recipe Name*</span>
            </label>
            <input type="text" placeholder="Recipe Name"
                {...register("name", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
        </div>
        <div className="flex my-4 gap-4">
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Category*</span>
                </label>
                <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                    <option disabled>Pick One</option>
                    <option>pizza</option>
                    <option>soup</option>
                    <option>salad</option>
                    <option>dessert</option>
                    <option>desi</option>
                    <option>drinks</option>
                </select>
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-semibold">Price*</span>
                </label>
                <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
            </div>
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
        </div>
        <div className="form-control w-full my-4">
            <label className="label">
                <span className="label-text">Item Image*</span>
            </label>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered file-input-error w-full" />
        </div>
        <input className="btn btn-sm mt-4 text-white bg-[#FF1821] hover:bg-[#e0181f] border-none" type="submit" value="Add Item" />
    </form>
</div>
  )
}

export default AddItem