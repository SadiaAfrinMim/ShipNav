
import HeaderAddFromTitle from '../../../HeaderTitle/HeaderAddFromTitle';


import ShipmentAdviceForm from '../ShipmentAdviceForm';



const ShipmentAdviceFormLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
       <ShipmentAdviceForm></ShipmentAdviceForm>


      </div>
    </div>
  );
};

export default ShipmentAdviceFormLayout ;