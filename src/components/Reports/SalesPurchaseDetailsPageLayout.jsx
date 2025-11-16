import React from 'react';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import SalesPurchaseDetailsPage from '../SharedAllListFrom/SalesPurchaseDetailsPage/SalesPurchaseDetailsPage';

const SalesPurchaseDetailsPageLayout = () => {
    return (
          <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <SalesPurchaseDetailsPage></SalesPurchaseDetailsPage>


      </div>
    </div>
    );
};

export default SalesPurchaseDetailsPageLayout;