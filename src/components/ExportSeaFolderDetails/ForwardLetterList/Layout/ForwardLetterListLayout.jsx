

import HeaderAddFromTitle from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderAddFromTitle';
import HeaderTittleFrom from '../../../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom';
import ForwardLetterList from '../ForwardLetterList';








const ForwardLetterListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
       
        <HeaderTittleFrom></HeaderTittleFrom>
        <ForwardLetterList></ForwardLetterList>


      </div>
    </div>
  );
};

export default ForwardLetterListLayout;