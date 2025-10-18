
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import StuffingPlanList from '../StuffingPlanList';






const StuffingExportLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <StuffingPlanList></StuffingPlanList>


      </div>
    </div>
  );
};

export default StuffingExportLayout;