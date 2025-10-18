




import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import CargoReceiveList from '../../../ExportFolderDetails/SharedAllListFrom/SharedList/CargoReceiveList';
import LegMasterBillList from '../../../ExportFolderDetails/SharedAllListFrom/SharedList/LegMasterBillList';






const ExportAirCargoLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <LegMasterBillList></LegMasterBillList>


      </div>
    </div>
  );
};

export default ExportAirCargoLayout;