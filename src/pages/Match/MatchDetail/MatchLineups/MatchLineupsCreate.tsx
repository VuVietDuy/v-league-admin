import fetcher from "@/api/fetcher";
import { ILineup } from "@/type/lineup";
import { renderPositionText } from "@/utils/renderPositionText";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, message, Modal, Table } from "antd";
import { TableProps } from "antd/lib";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function MatchLineupsCreate(props: any) {
  const { open, onCancel, lineups, setLineups, refetch } = props;
  const { matchId } = useParams();

  useEffect(() => {
    setLineups(lineups);
  }, [lineups]);

  const handleAddLineups = (lineupsId: number) => {
    setLineups((prev: any) =>
      prev.map((lineup: any) =>
        lineup.id === lineupsId ? { ...lineup, isStarting: true } : lineup
      )
    );
  };

  const handleRemoveLineups = (lineupsId: number) => {
    setLineups((prev: any) =>
      prev.map((lineup: any) =>
        lineup.id === lineupsId ? { ...lineup, isStarting: false } : lineup
      )
    );
  };

  const handleSubmit = () => {
    const data = lineups.map((lineup: any) => ({
      id: lineup.id,
      clubId: lineup.clubId,
      matchId: lineup.matchId,
      playerId: lineup.playerId,
      isStarting: lineup.isStarting,
    }));

    fetcher
      .post(`matches/${matchId}/lineups`, data)
      .then((res) => {
        refetch();
        onCancel();
        message.success("Tạo đội hình thành công");
      })
      .catch((err) => {
        console.log(err);
        message.error("Tạo đội hình không thành công");
      });
  };

  const columns: TableProps<ILineup>["columns"] = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          <Avatar
            className="mr-2"
            shape="square"
            size="large"
            src={record.player.imageURL}
          />
          <Link to={`/players/${record.id}`}>{record.player.name}</Link>
        </>
      ),
    },
    {
      title: "Số áo",
      dataIndex: "shirtNumber",
      key: "shirtNumber",
      render: (_, record) => <span>{record.player.shirtNumber}</span>,
    },
    {
      title: "Vị trí thi đấu",
      dataIndex: "position",
      key: "position",
      render: (_, record) => (
        <span>{renderPositionText(record.player.position)}</span>
      ),
    },
    {
      title: "",
      dataIndex: "position",
      key: "position",
      render: (_, record) => (
        <>
          {record.isStarting ? (
            <Button onClick={() => handleRemoveLineups(record.id)} danger>
              <CloseOutlined />
            </Button>
          ) : (
            <Button onClick={() => handleAddLineups(record.id)}>
              <ArrowRightOutlined />
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <Modal title={""} open={open} onCancel={onCancel} footer={[]} width={1000}>
      <div className="grid grid-cols-2 gap-6 overflow-y-auto h-[800px]]">
        <div>
          <h2 className="text-xl">Danh sách cầu thủ</h2>
          <Table<ILineup>
            pagination={{ pageSize: 5 }}
            columns={columns}
            rowKey="id"
            dataSource={lineups.filter((lineup: any) => !lineup.isStarting)}
          />
        </div>
        <div>
          <h2 className="text-xl">Đội hình ra sân</h2>
          <Table<ILineup>
            pagination={{ pageSize: 5 }}
            columns={columns}
            rowKey="id"
            dataSource={lineups.filter((lineup: any) => lineup.isStarting)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="default" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </Modal>
  );
}
