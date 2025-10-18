

import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import ShippingOrderList from '../../../ExportFolderDetails/SharedAllListFrom/SharedList/ShippingOrderList';


const ShippingExportAirLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <ShippingOrderList></ShippingOrderList>


      </div>
    </div>
  );
};

export default ShippingExportAirLayout;