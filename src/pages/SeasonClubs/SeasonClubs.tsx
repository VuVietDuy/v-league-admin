import { Avatar, Button, Card, Input, Space, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IClub } from "../../type/club";
import { useEffect, useState } from "react";
import SearchClub from "./SearchClub";
import fetcher from "../../api/fetcher";
import { useParams } from "react-router-dom";

const columns: TableProps<IClub>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Logo",
    key: "logo",
    render: (_, record) => (
      <Avatar shape="square" size="large" src={record.logoURL} />
    ),
  },
  {
    title: "Tên câu lạc bộ",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Sân vận động",
    dataIndex: "stadium",
    key: "stadium",
  },
  {
    title: "Huấn luyện viên",
    dataIndex: "coach",
    key: "coach",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" danger>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

function SeasonClubs() {
  const [isOpenModalAddClub, setIsOpenModalAddClub] = useState<boolean>(false);
  const { tournament } = useParams();
  const [clubs, setClubs] = useState<IClub[]>([]);

  useEffect(() => {
    fetcher
      .get(`seasons/${tournament}/clubs`)
      .then((res) => {
        console.log(res);
        setClubs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tournament]);

  const showModal = () => {
    setIsOpenModalAddClub(true);
  };

  const handleCancel = () => {
    setIsOpenModalAddClub(false);
  };
  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div>
          <Input></Input>
        </div>
        <Button onClick={showModal} type="primary">
          Thêm clb{" "}
        </Button>
      </div>
      <Table<IClub> columns={columns} dataSource={clubs} />
      <SearchClub open={isOpenModalAddClub} onCancel={handleCancel} />
    </Card>
  );
}

export default SeasonClubs;
