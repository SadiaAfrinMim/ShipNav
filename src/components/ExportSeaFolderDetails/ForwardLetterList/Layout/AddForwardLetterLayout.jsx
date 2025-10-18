







import HeaderAddFromTitle from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';

import AddFirstLegMBL from '../../../ExportFolderDetails/SharedAllListFrom/SharedFrom/AddFirstLegMBL';
import AddForwardLetter from '../AddForwardLetter';

const AddForwardLetterLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderAddFromTitle></HeaderAddFromTitle>
        <AddForwardLetter></AddForwardLetter>
        


      </div>
    </div>
  );
};

export default AddForwardLetterLayout;