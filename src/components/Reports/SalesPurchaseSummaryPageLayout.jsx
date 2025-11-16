import React from 'react';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import SalesPurchaseSummaryPage from '../SharedAllListFrom/SalesPurchaseDetailsPage/SalesPurchaseSummaryPage';

const SalesPurchaseSummaryPageLayout = () => {
    return (
          <div className='p-4 '>
        
        
        
              <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
                <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
               <SalesPurchaseSummaryPage></SalesPurchaseSummaryPage>
        
        
              </div>
            </div>
    );
};

export default SalesPurchaseSummaryPageLayout;