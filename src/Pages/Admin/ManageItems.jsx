import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMenu from "../../Hooks/UseMenu";



const ManageItems = () => {
    const [menu, _, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className='mx-auto h-full'>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-4 ms-4 lg:hidden">Open drawer</label>
        <h1 className='text-4xl text-center text-zinc-800 font-bold leading-[4rem] my-6'>Management Items</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">#</th>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">Item</th>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">Category</th>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">Price</th>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">Update</th>
                            <th className="  text-white bg-[#FF1821] hover:bg-[#e0181f] text-center w-max">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.category}
                                </td>
                                <td className="text-right">${item.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;