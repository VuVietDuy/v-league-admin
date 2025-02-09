import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, Select, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/api/fetcher";
import MatchCreate from "./MatchCreate";
import { queryKeys } from "@/api/queryKeys";
import { IMatch } from "@/type/match";
import { IClub } from "@/type/club";
import { formatDate } from "@/utils/formatDate";
import { renderMatchStatus } from "@/utils/renderMatchStatus";

const MatchList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { tournament } = useParams();
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<number>();
  const [selectedMatchStatus, setSelectedMatchStatus] = useState<string>();

  const {
    data: matches,
    refetch,
    isLoading,
  } = useQuery<IMatch[]>({
    queryKey: [queryKeys.GET_LIST_MATCH],
    queryFn: async () => {
      let params = {};
      if (selectedClubId) {
        params = { clubId: selectedClubId, ...params };
      }
      if (selectedMatchStatus) {
        params = { status: selectedMatchStatus, ...params };
      }
      return fetcher
        .get(`tournaments/${tournament}/fixtures`, {
          params: params,
        })
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    fetcher
      .get(`tournaments/${tournament}/clubs?season=current`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tournament]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMatch = (id: number) => {
    message.warning("Không thể xóa trận đấu");
  };

  const handleSelectClub = (e: any) => {
    setSelectedClubId(e);
  };

  const handleSelectMatchStatus = (e: any) => {
    setSelectedMatchStatus(e);
  };

  useEffect(() => {
    refetch();
  }, [selectedClubId, selectedMatchStatus]);

  const columns: ColumnsType<IMatch> = [
    {
      title: "Đội chủ nhà",
      dataIndex: "homeClub",
      key: "homeClub",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-10 rounded-full"
            src={record.homeClub?.logoURL}
            alt=""
          />
          <p className="font-semibold">{record.homeClub?.name}</p>
        </div>
      ),
    },
    {
      title: "Đội khách",
      dataIndex: "awayClub",
      key: "awayClub",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-10 rounded-full"
            src={record.awayClub?.logoURL}
            alt=""
          />
          <p className="font-semibold">{record.awayClub?.name}</p>
        </div>
      ),
    },
    {
      title: "Ngày thi đấu",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <span>{formatDate(record.date)}</span>,
    },
    {
      title: "Trang thai",
      dataIndex: "status",
      key: "status",
      render: (text) => renderMatchStatus(text),
    },
    {
      title: "Địa điểm",
      dataIndex: "stadium",
      key: "stadium",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link to={`${record.id}`}>
            <Button type="primary" size="small">
              <EyeFilled />
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa lịch này?"
            onConfirm={() => deleteMatch(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="default" size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div className="flex">
        <div className="flex-1 flex gap-4">
          <Select
            onChange={handleSelectClub}
            defaultValue={""}
            className="w-40"
          >
            <Select.Option value="">Tất cả câu lạc bộ</Select.Option>
            {clubs.map((club) => (
              <Select.Option key={club.id} value={club.id}>
                {club.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            onChange={handleSelectMatchStatus}
            defaultValue={""}
            className="w-40"
          >
            <Select.Option value="">Tất cả</Select.Option>
            <Select.Option value="SCHEDULED">Đã lên lịch</Select.Option>
            <Select.Option value="ONGOING">Đang diễn ra</Select.Option>
            <Select.Option value="COMPLETED">Đã kết thúc</Select.Option>
          </Select>
        </div>
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{ marginBottom: 20 }}
        >
          Thêm Lịch Thi Đấu
        </Button>
      </div>
      {isLoading ? (
        "Loading"
      ) : (
        <Table dataSource={matches || []} columns={columns} rowKey="id" />
      )}
      <MatchCreate open={isModalOpen} onCancel={closeModal} refetch={refetch} />
    </div>
  );
};

export default MatchList;
