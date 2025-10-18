







import HeaderAddFromTitle from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import AddCargoReceive from '../../../ExportFolderDetails/SharedAllListFrom/SharedFrom/AddCargoReceive';
import AddFirstLegMasterBill from '../../../ExportFolderDetails/SharedAllListFrom/SharedFrom/AddFirstLegMasterBill';

const ExportAirCargoAddLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddFirstLegMasterBill></AddFirstLegMasterBill>
        


      </div>
    </div>
  );
};

export default ExportAirCargoAddLayout;