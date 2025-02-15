import { Button, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { IEvent } from "@/type/event";
import AddEvent from "./AddEvent";
import { TableProps } from "antd/lib";
import { queryKeys } from "@/api/queryKeys";
import fetcher from "@/api/fetcher";
import { IMatch } from "@/type/match";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { renderEventTypeText } from "@/utils/renderEventTypeText";

export default function MatchEvents() {
  const { matchId } = useParams();
  const [openModalAddEvent, setOpenModalAddEvent] = useState<boolean>(false);
  const [selectedClubId, setSelectedClubId] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<string>("");

  const { data, refetch, isLoading } = useQuery<IMatch>({
    queryKey: [queryKeys.GET_MATCH_EVENTS],
    queryFn: async () => {
      let params = { ...(selectedClubId && { clubId: selectedClubId }) };
      params = {
        ...params,
        ...(selectedEventType && { eventType: selectedEventType }),
      };

      return fetcher
        .get(`matches/${matchId}/events`, {
          params: params,
        })
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [selectedClubId, selectedEventType]);

  const onOpen = () => {
    setOpenModalAddEvent(true);
  };

  const onCancel = () => {
    setOpenModalAddEvent(false);
  };

  const columns: TableProps<IEvent>["columns"] = [
    {
      title: "Kiểu",
      dataIndex: "eventType",
      key: "eventType",
      render: (text) => <a>{renderEventTypeText(text)}</a>,
    },
    {
      title: "Câu lạc bộ",
      dataIndex: "club",
      key: "club",
      render: (_, record) => <a>{record.club?.name}</a>,
    },
    {
      title: "Cầu thủ",
      dataIndex: "player",
      key: "player",
      render: (_, record) => <a>{record.player?.name}</a>,
    },
    {
      title: "Hỗ trợ",
      dataIndex: "assist",
      key: "assist",
      render: (_, record) => <a>{record.assist?.name}</a>,
    },
    {
      title: "Mốc thời gian",
      dataIndex: "eventTime",
      key: "eventTime",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button danger size="middle">
          <DeleteOutlined />
        </Button>
      ),
    },
  ];
  return (
    <div className="mt-4">
      <div className="flex mb-4">
        <div className="flex flex-1 gap-4">
          {isLoading ? (
            <Spin />
          ) : (
            <Select
              defaultValue={""}
              onChange={(e) => setSelectedClubId(e)}
              className="w-40"
            >
              <Select.Option value="">Tất cả đội bóng</Select.Option>
              <Select.Option value={data?.homeClubId}>
                {data?.homeClub?.name}
              </Select.Option>
              <Select.Option value={data?.awayClubId}>
                {data?.awayClub?.name}
              </Select.Option>
            </Select>
          )}
          <Select
            defaultValue={""}
            onChange={(e) => setSelectedEventType(e)}
            className="w-40"
          >
            <Select.Option value="">Tất cả</Select.Option>
            <Select.Option value="GOAL">Bàn thắng</Select.Option>
            <Select.Option value="YELLOW_CARD">Thẻ vàng</Select.Option>
            <Select.Option value="RED_CARD">Thẻ đỏ</Select.Option>
            <Select.Option value="SUBSTITUTION">Thay người</Select.Option>
            <Select.Option value="OWN_GOAL">Phản lưới</Select.Option>
            <Select.Option value="SHOTS">Dứt điểm</Select.Option>
            <Select.Option value="SHOTS_ON_TARGET">
              Dứt điểm trúng đích
            </Select.Option>
            <Select.Option value="BIG_CHANCES_CREATED">
              Cơ hội lớn
            </Select.Option>
            <Select.Option value="KEY_PASSES">Thẻ đỏ</Select.Option>
            <Select.Option value="SUCCESSFUL_DRIBBLES">Thẻ đỏ</Select.Option>
            <Select.Option value="SAVE">Cứu thua</Select.Option>
          </Select>
        </div>
        <Button type="primary" onClick={onOpen}>
          <PlusOutlined />
          Thêm sự kiện
        </Button>
      </div>
      <Table<IEvent>
        rowKey={"id"}
        columns={columns}
        dataSource={data?.events}
      />

      {!isLoading && data && (
        <AddEvent
          refetch={refetch}
          homeClub={data?.homeClub}
          awayClub={data?.awayClub}
          open={openModalAddEvent}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
