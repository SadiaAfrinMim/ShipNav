
import HeaderAddFromTitle from '../../SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import AddFreightInvoice from '../AddFreightInvoiceFrom';





const AddFreightInvoiceLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddFreightInvoice></AddFreightInvoice>


      </div>
    </div>
  );
};

export default AddFreightInvoiceLayout;