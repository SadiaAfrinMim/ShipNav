import HeaderSettingsAddTitle from "../../SharedAllListFrom/HeaderTitle/HeaderSettingsAddTitle";
import ProductList from "../../SharedAllListFrom/SharedList/ProductList";


const ProductListLayout = () => {
    return (
         <div className='p-4'>
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                
                <HeaderSettingsAddTitle></HeaderSettingsAddTitle>     
                <ProductList></ProductList>
        
        
              </div>
            </div>
    );
};

export default ProductListLayout;