import HeaderTittleFrom from "../ExportFolderDetails/SharedAllListFrom/HeaderTitle/HeaderTittleFrom";
import ReceiveVoucherList from "../SharedAllListFrom/SharedFrom/Accounts/ReceiveVoucherList";


const OrderLayout = () => {
    return (
          <div className='p-4 '>



      <div className="bg-white  rounded-t-xl shadow-md overflow-hidden">
        <HeaderTittleFrom></HeaderTittleFrom>
        <ReceiveVoucherList></ReceiveVoucherList>


      </div>
    </div>
    );
};

export default OrderLayout;