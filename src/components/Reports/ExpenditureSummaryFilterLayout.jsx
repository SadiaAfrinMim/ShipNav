import React from 'react';
import HeaderTittlePrintFrom from '../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import ExpenditureSummaryFilter from '../SharedAllListFrom/Reports/ExpenditureSummaryFilter';

const ExpenditureSummaryFilterLayout = () => {
    return (
        <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
       <ExpenditureSummaryFilter></ExpenditureSummaryFilter>


      </div>
    </div>
    );
};

export default ExpenditureSummaryFilterLayout;