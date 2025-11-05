import React from 'react';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import BankStatementFilter from '../SharedAllListFrom/Reports/BankStatementFilter';

const BankStatementLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
        <BankStatementFilter></BankStatementFilter>


      </div>
    </div>
    );
};

export default BankStatementLayout;