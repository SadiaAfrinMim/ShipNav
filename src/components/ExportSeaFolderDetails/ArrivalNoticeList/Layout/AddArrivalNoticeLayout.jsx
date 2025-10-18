







import HeaderAddFromTitle from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';

import AddFirstLegMBL from '../../../ExportFolderDetails/SharedAllListFrom/SharedFrom/AddFirstLegMBL';
import AddArrivalNotice from '../AddArrivalNotice';

const AddArrivalNoticeLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddArrivalNotice></AddArrivalNotice>
        


      </div>
    </div>
  );
};

export default AddArrivalNoticeLayout;