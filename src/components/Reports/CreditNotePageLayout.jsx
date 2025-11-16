import React from 'react';
import CreditNotePage from '../SharedAllListFrom/SalesPurchaseDetailsPage/CreditNotePage';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';

const CreditNotePageLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <CreditNotePage></CreditNotePage>


      </div>
    </div>
    );
};

export default CreditNotePageLayout;