
import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';


import DeliveryOrderList from '../DeliveryOrderList';

const DeliveryOrderLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <DeliveryOrderList></DeliveryOrderList>
        


      </div>
    </div>
  );
};

export default DeliveryOrderLayout;