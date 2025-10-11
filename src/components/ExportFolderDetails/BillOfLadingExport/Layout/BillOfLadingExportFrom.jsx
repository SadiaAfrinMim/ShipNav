import React from 'react';
import HeaderTittleFrom from '../../../HeaderTitle/HeaderTittleFrom';

import BillOfLadingForm from '../BillOfLadingForm';

const BillOfLadingExportFrom = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <BillOfLadingForm></BillOfLadingForm>

      </div>
    </div>
    );
};

export default BillOfLadingExportFrom;