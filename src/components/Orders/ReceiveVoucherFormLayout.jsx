import React from 'react';
import HeaderAddFromTitle from '../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';

import ReceiveVoucherForm from '../SharedAllListFrom/SharedFrom/Orders/ReceiveVoucherForm';

const ReceiveVoucherFormLayout = () => {
    return (
         <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <ReceiveVoucherForm></ReceiveVoucherForm>


      </div>
    </div>
    );
};

export default ReceiveVoucherFormLayout;