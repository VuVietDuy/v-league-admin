import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMatch } from "../../type/match";
import fetcher from "../../api/fetcher";
import { Button, Card, Space, Table, Tag } from "antd";
import AddEvent from "./AddEvent";
import { TableProps } from "antd/lib";
import { IEvent } from "../../type/event";

export default function MatchDetail() {
  const { matchId } = useParams();
  const [match, setMatch] = useState<IMatch>();
  const [openModalAddEvent, setOpenModalAddEvent] = useState<boolean>(false);

  useEffect(() => {
    fetcher
      .get(`matches/${matchId}`)
      .then((res) => {
        console.log(res);
        setMatch(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cầu thủ",
      dataIndex: "player",
      key: "player",
      render: (_, record) => <a>{record.player?.name}</a>,
    },
    {
      title: "Mốc thời gian",
      dataIndex: "eventTime",
      key: "eventTime",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card className="m-6">
      <div className="flex justify-between">
        <h2>Sự kiện</h2>
        <Button onClick={onOpen}>Thêm sự kiện</Button>
      </div>
      <Table<IEvent> columns={columns} dataSource={match?.events} />

      {match && (
        <AddEvent
          homeClub={match?.homeClub}
          awayClub={match?.awayClub}
          open={openModalAddEvent}
          onCancel={onCancel}
        />
      )}
    </Card>
  );
}
