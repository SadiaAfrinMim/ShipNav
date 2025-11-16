import React from 'react';
import ProductWiseSalePage from '../SalesPurchaseDetailsPage/ProductWiseSalePage';
import HeaderTittlePrintFrom from '../HeaderTitle/HeaderTittlePrintFrom';

const ProductWiseSalePageLayout = () => {
    return (
          <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <ProductWiseSalePage></ProductWiseSalePage>


      </div>
    </div>
    );
};

export default ProductWiseSalePageLayout;