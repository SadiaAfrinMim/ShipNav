import React from 'react';
import StockReorderPage from '../SharedAllListFrom/Reports/StockReorderPage';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';

const StockReorderPageLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <StockReorderPage></StockReorderPage>


      </div>
    </div>
    );
};

export default StockReorderPageLayout;