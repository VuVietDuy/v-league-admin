import {
  Avatar,
  Button,
  Card,
  Input,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IClub } from "@/type/club";
import { useEffect, useState } from "react";
import SearchClub from "./SearchClub";
import fetcher from "@/api/fetcher";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  const [key, setKey] = useState("");
  const {
    data: clubs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["GET_SEASON_CLUB"],
    queryFn: async () => {
      let params = {};
      if (key) {
        params = { ...params, key: key };
      }
      return fetcher
        .get(`tournaments/${tournament}/clubs`, { params: params })
        .then((res) => res.data);
    },
  });

  const { data: seasons } = useQuery({
    queryKey: ["GET_LIST_SEASON"],
    queryFn: async () =>
      fetcher.get(`tournaments/${tournament}/seasons`).then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [tournament, key]);

  const showModal = () => {
    setIsOpenModalAddClub(true);
  };

  const handleCancel = () => {
    setIsOpenModalAddClub(false);
  };
  if (isLoading) {
    return <div>Is Loading</div>;
  }
  return (
    <Card className="m-6">
      <div className="flex justify-between mb-3">
        <div className="flex gap-2">
          <div>
            <Input
              onChange={(e) => setKey(e.target.value)}
              placeholder="Tìm kiếm"
            ></Input>
          </div>
          <Select className="w-40">
            {seasons &&
              seasons.map((season: any, index: any) => (
                <Select.Option key={index} value={season.id}>
                  {season.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        <Button onClick={showModal} type="primary">
          Thêm clb{" "}
        </Button>
      </div>
      <Table<IClub> rowKey="id" columns={columns} dataSource={clubs} />
      <SearchClub open={isOpenModalAddClub} onCancel={handleCancel} />
    </Card>
  );
}

export default SeasonClubs;
