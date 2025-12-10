

import HeaderTittlePrintFrom from '../../../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';

import ShippingOrderPrint from '../ShippingOrderPrint';

const ShippingOrderPrintLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
        <ShippingOrderPrint></ShippingOrderPrint>


      </div>
    </div>
  );
};

export default ShippingOrderPrintLayout;