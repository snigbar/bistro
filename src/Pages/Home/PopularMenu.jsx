
import MenuItem from "../../Components/MenuItem";
import SectionTitle from "../../Components/SectionTitle";
import useMenu from "../../Hooks/UseMenu";


const PopularMenu = () => {
    const [menu] = useMenu()
    
    const popular = menu.filter(item => item.category === 'popular');
    
    return (
        <section className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center my-8">
            <button className="btn btn-warning btn-outline  border-0 border-b-4 mt-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;