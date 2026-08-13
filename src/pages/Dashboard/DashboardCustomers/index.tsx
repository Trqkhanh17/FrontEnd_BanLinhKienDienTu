import { useEffect, useState } from 'react';
import LayoutDash from '../Layout';
import { bannedCustomerAPI, listCustomerAPI, unBannedCustomerAPI } from '../../../api/customerAPI';
import { toast } from 'react-toastify';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
interface Customer {
  cus_id: number;
  cus_avatar: string;
  cus_name: string;
  cus_email: string;
  cus_birthday: string;
  cus_address: string;
  cus_phone: string;
  cus_create: string;
  cus_update: string;
  is_banned: number;
}
DataTable.use(DT);
const CustomersDas = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const res = await listCustomerAPI();
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(data);

  const checkIsBanned = (banned: number) => {
    return banned === 1;
  };

  const getBannedStatus = (banned: number) => {
    return banned === 1 ? "Banned" : "Not Banned";
  };

  const handleSubmitBanned = async (cusEmail: string) => {
    try {
      const data = { acc_email: cusEmail };
      const res = await bannedCustomerAPI(data);
      getAllCustomers();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUnBanned = async (cusEmail: string) => {
    try {
      const data = { acc_email: cusEmail };
      const res = await unBannedCustomerAPI(data);
      getAllCustomers();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutDash>
      <div className="panel min-w-0 overflow-hidden">
        <div className="mb-5"><p className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-600">Quản lý</p><h1 className="dashboard-title !mb-0">Khách hàng</h1></div>
        {loading ? (
          <p className="py-8 text-center text-slate-500">Đang tải khách hàng...</p>
        ) : data.length === 0 ? (
          <p className="py-8 text-center text-slate-500">Chưa có khách hàng.</p>
        ) : (
          <DataTable className="table table-striped display" options={{ lengthMenu: [5] }}>
            <thead>
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">Tên Khách Hàng</th>
                <th scope="col">Email</th>
                <th scope="col">Ngày Sinh</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày cập nhật</th>
                <th scope="col">Trạng thái tài khoản</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: Customer) => (
                <tr key={item.cus_id}>
                  <td>
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={item.cus_avatar}
                      alt="Product image"
                    />
                  </td>
                  <td>{item.cus_name}</td>
                  <td>{item.cus_email}</td>
                  <td>{item.cus_birthday}</td>
                  <td>{item.cus_address}</td>
                  <td>{item.cus_phone}</td>
                  <td>{item.cus_create}</td>
                  <td>{item.cus_update}</td>
                  <td>{getBannedStatus(item.is_banned)}</td>
                  <td>
                    {
                      checkIsBanned(item.is_banned) ? (
                        <button
                          className="primary-button !min-h-9 !px-3 !py-1 text-xs"
                          onClick={() => handleSubmitUnBanned(item.cus_email)}
                        >
                          Mở khóa tài khoản
                        </button>
                      ) : (
                        <button
                          className="danger-button !min-h-9 !px-3 !py-1 text-xs"
                          onClick={() => handleSubmitBanned(item.cus_email)}
                        >
                          Khóa tài khoản
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </div>
    </LayoutDash>
  );
};

export default CustomersDas;
