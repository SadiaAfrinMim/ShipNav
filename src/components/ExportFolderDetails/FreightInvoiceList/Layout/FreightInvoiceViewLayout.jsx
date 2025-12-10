
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';


import FreightInvoiceView from '../FreightInvoiceView';



const FreightInvoiceViewLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <FreightInvoiceView></FreightInvoiceView>


      </div>
    </div>
  );
};

export default FreightInvoiceViewLayout;