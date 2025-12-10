import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';


import HeaderTittlePrintFrom from '../../../SharedAllListFrom/HeaderTitle/HeaderTittlePrintFrom';
import CargoReceivePrint from '../CargoReceivePrint';





const CargoReceivePrintLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittlePrintFrom></HeaderTittlePrintFrom>
        <CargoReceivePrint></CargoReceivePrint>


      </div>
    </div>
  );
};

export default CargoReceivePrintLayout;