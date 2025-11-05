import React from 'react';
import BalanceSheetFilter from '../SharedAllListFrom/Reports/BalanceSheetFilter';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';

const BalanceSheetLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
        <BalanceSheetFilter></BalanceSheetFilter>


      </div>
    </div>
    );
};

export default BalanceSheetLayout;