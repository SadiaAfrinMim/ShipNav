
import HeaderTittleFrom from '../../../HeaderTitle/HeaderTittleFrom';
import ShippingOrderList from './../ShippingOrderList';

const ShippingExportLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <ShippingOrderList></ShippingOrderList>


      </div>
    </div>
  );
};

export default ShippingExportLayout;