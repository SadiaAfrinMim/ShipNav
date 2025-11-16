

import BusinessList from '../SharedAllListFrom/SharedList/BusinessList';
import AdminHeaderWithModal from '../SharedAllListFrom/HeaderTitle/AdminHeaderWithModal';


const BusinessListLayout = () => {
  return (
    <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <AdminHeaderWithModal></AdminHeaderWithModal>

        <BusinessList></BusinessList>


      </div>
    </div>
  );
};

export default BusinessListLayout;