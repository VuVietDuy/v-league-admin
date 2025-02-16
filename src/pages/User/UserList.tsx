import { Button, Card, Input, Select, Space, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/api/fetcher";
import { renderGenderText } from "@/utils/renderGenderText";
import { renderRoleText } from "@/utils/renderRoleText";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    render: (value: any) => renderGenderText(value),
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    render: (value: any) => renderRoleText(value),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <Button type="primary" danger>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

function UserList() {
  const [roleFilter, setRoleFilter] = useState("");
  const [key, setKey] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_LIST_USERS"],
    queryFn: async () => {
      let params = {};
      if (roleFilter) {
        params = { ...params, role: roleFilter };
      }
      if (key) {
        params = { ...params, key: key };
      }
      return fetcher
        .get("users", {
          params: params,
        })
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [roleFilter, key]);

  console.log(data);
  if (isLoading) {
    return <div>Is Loading</div>;
  }
  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Input
              onChange={(e) => setKey(e.target.value)}
              placeholder="Tìm kiếm"
            ></Input>
          </div>
          <Select
            onChange={(e) => setRoleFilter(e)}
            className="w-40"
            defaultValue={""}
          >
            <Select.Option value="">Tất cả</Select.Option>
            <Select.Option value="ADMIN">Quản trị viên</Select.Option>
            <Select.Option value="USER">Người dùng</Select.Option>
          </Select>
        </div>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </Card>
  );
}

export default UserList;
