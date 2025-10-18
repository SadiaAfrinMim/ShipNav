

import FreightInvoiceList from '../../../ExportFolderDetails/FreightInvoiceList/FreightInvoiceList';
import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';








const FreightInvoiceListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <FreightInvoiceList></FreightInvoiceList>


      </div>
    </div>
  );
};

export default FreightInvoiceListLayout;