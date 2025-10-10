import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import CargoReceiveList from '../CargoReceiveList';
import HeaderTittleFrom from '../../../HeaderTitle/HeaderTittleFrom';





const CargoExportLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <CargoReceiveList></CargoReceiveList>


      </div>
    </div>
  );
};

export default CargoExportLayout;