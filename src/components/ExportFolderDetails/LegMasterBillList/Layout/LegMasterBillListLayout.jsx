
import HeaderTittleFrom from '../../SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import LegMasterBillList from '../../SharedAllListFrom/SharedList/LegMasterBillList';








const LegMasterBillListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <LegMasterBillList></LegMasterBillList>


      </div>
    </div>
  );
};

export default LegMasterBillListLayout;