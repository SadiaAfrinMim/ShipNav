import React from 'react';
import PaymentVoucherForm from '../SharedAllListFrom/SharedFrom/Accounts/PaymentVoucherFormAccount';
import HeaderAddFromTitle from '../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';

const AccountLayout = () => {
    return (
        <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <PaymentVoucherForm></PaymentVoucherForm>


      </div>
    </div>
    );
};

export default AccountLayout;