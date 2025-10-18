

import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';

import LegMasterBillList from '../../../ExportFolderDetails/SharedAllListFrom/SharedList/LegMasterBillList';






const ExportAirMasterListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <LegMasterBillList></LegMasterBillList>


      </div>
    </div>
  );
};

export default ExportAirMasterListLayout;