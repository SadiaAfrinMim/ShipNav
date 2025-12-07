
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import StuffingPackageList from '../StuffingPackageList';









const StuffingPackageLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        
      <StuffingPackageList></StuffingPackageList>
        
       


      </div>
    </div>
  );
};

export default StuffingPackageLayout;