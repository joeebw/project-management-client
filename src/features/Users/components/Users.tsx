import CustomTable from "@/components/CustomeTable";
import { Column } from "@/components/CustomeTable";
import UserAvatar from "@/components/UserAvatar";
import useFetch from "@/hooks/useFetch";

type User = {
  id: string | number;
  userName: string;
  profilePicture: string;
};

const columns: Column<User>[] = [
  {
    field: "id",
    header: "ID",
    width: 100,
  },
  {
    field: "userName",
    header: "Username",
    width: 200,
  },
  {
    field: "profilePicture",
    header: "Profile Picture",
    width: 150,
    render: (_, row) => (
      <div className="flex ml-7">
        <UserAvatar
          name={row.userName}
          size="sm"
          className="p-2"
          isLoading={false}
        />
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, loading } = useFetch<User[]>("/user/all-users");

  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-semibold">Users</h3>
        <span className="text-lg font-medium text-gray-500 pr-7">
          {users?.length} total
        </span>
      </div>

      <div className="mt-5">
        <CustomTable columns={columns} data={users} loading={loading} />
      </div>
    </div>
  );
};

export default Users;
