import { Button, Form, Input, message, Modal, Select } from "antd";
import fetcher from "../../api/fetcher";
import { useEffect, useState } from "react";
import { IPlayer } from "../../type/player";
import { useParams } from "react-router-dom";

export default function AddEvent({
  homeClub,
  awayClub,
  open,
  onOk,
  onCancel,
  ...props
}: any) {
  const { matchId } = useParams();
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [clubId, setClubId] = useState<number>();
  const initialValues = {
    matchId: matchId,
    clubId: "",
    playerId: "",
    eventType: "",
    eventTime: "",
  };

  const onFinish = (values: any) => {
    console.log(values);
    if (matchId) {
      values.matchId = parseInt(values.matchId);
      values.eventTime = parseInt(values.eventTime);
      fetcher.post(`matches/${matchId}/events`, values).then((res) => {
        message.success(res.data.message);
        onCancel();
      });
    }
  };

  useEffect(() => {
    console.log(clubId);
    fetcher.get(`clubs/${clubId}/players`).then((res) => {
      setPlayers(res.data.data.players);
    });
  }, [clubId]);

  return (
    <Modal
      open={open}
      //   onOk={onOk}
      onCancel={onCancel}
      footer={[]}
      {...props}
      title="Thêm sự kiến"
    >
      <Form
        initialValues={initialValues}
        name="add_event_into_match"
        onFinish={onFinish}
        layout="vertical"
      >
        {matchId && (
          <Form.Item name={"matchId"} className="hidden">
            <Input value={matchId} />
          </Form.Item>
        )}
        <Form.Item label="Đội bóng" name="clubId">
          <Select onChange={(e) => setClubId(e)}>
            {homeClub.id && (
              <Select.Option value={homeClub.id}>{homeClub.name}</Select.Option>
            )}
            {awayClub.id && (
              <Select.Option value={awayClub.id}>{awayClub.name}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Cầu thủ" name="playerId">
          <Select>
            {players &&
              players.map((player) => (
                <Select.Option key={player.id} value={player.id}>
                  {player.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Loại" name="eventType">
          <Select>
            <Select.Option value="Goal">Bàn thắng</Select.Option>
            <Select.Option value="YellowCard">Thẻ vàng</Select.Option>
            <Select.Option value="RedCard">Thẻ đỏ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mốc thời gian" name="eventTime">
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
