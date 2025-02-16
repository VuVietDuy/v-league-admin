import { Button, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { IPlayer } from "@/type/player";
import fetcher from "@/api/fetcher";
import { Formik } from "formik";

export default function AddEvent({
  refetch,
  homeClub,
  awayClub,
  open,
  onOk,
  onCancel,
  ...props
}: any) {
  const { matchId } = useParams();
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedClub, setSelectedClub] = useState<number>();
  const [selectedPlayer, setSelectedPlayer] = useState<number>();
  const [selectedAssist, setSelectedAssist] = useState<number>();
  const initialValues = {
    matchId: matchId,
    clubId: undefined,
    playerId: undefined,
    eventType: "",
    eventTime: "",
    assistId: undefined,
  };

  const onFinish = (values: any, { resetForm }: any) => {
    if (matchId) {
      values.matchId = parseInt(values.matchId);
      values.eventTime = parseInt(values.eventTime);
      values.clubId = selectedClub;
      values.playerId = selectedPlayer;
      values.assistId = selectedAssist;
      fetcher.post(`matches/${matchId}/events`, values).then((_) => {
        message.success("Thêm sự kiện thành công");
        refetch();
        onCancel();
        resetForm();
      });
    }
  };

  const handleSelectClub = (e: any) => {
    setSelectedClub(e);
    if (e === homeClub.id) {
      setPlayers(homeClub.players);
    } else {
      setPlayers(awayClub.players);
    }
  };

  return (
    <Modal
      open={open}
      //   onOk={onOk}
      onCancel={onCancel}
      footer={[]}
      {...props}
      title="Thêm sự kiến"
    >
      <Formik
        onSubmit={(values, { resetForm }) => onFinish(values, { resetForm })}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, setFieldValue, resetForm }) => (
          <Form
            initialValues={initialValues}
            name="add_event_into_match"
            onFinish={handleSubmit}
            layout="vertical"
          >
            {matchId && (
              <Form.Item name={"matchId"} className="hidden">
                <Input value={matchId} name="matchId" />
              </Form.Item>
            )}
            <Form.Item label="Loại sự kiện" name="eventType">
              <Select
                value={values.eventType}
                onChange={(e) => {
                  setFieldValue("eventType", e);
                  if (e === "START") {
                    setFieldValue("eventTime", "0");
                  }
                }}
              >
                <Select.Option value="START">Bắt đầu</Select.Option>
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
                <Select.Option value="SUCCESSFUL_DRIBBLES">
                  Thẻ đỏ
                </Select.Option>
                <Select.Option value="SAVE">Cứu thua</Select.Option>
                <Select.Option value="FINISH">Kết thúc</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Đội bóng" name="clubId">
              <Select
                className="clubId"
                value={values.eventType}
                onChange={(e) => {
                  setFieldValue("clubId", e);
                  handleSelectClub(e);
                }}
                disabled={
                  values.eventType === "START" || values.eventType === "FINISH"
                }
              >
                {homeClub.id && (
                  <Select.Option value={homeClub.id}>
                    {homeClub.name}
                  </Select.Option>
                )}
                {awayClub.id && (
                  <Select.Option value={awayClub.id}>
                    {awayClub.name}
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item label="Cầu thủ" name="playerId">
              <Select
                value={values.playerId}
                onChange={(e) => {
                  setFieldValue("playerId", e), setSelectedPlayer(e);
                }}
                disabled={
                  values.eventType === "START" || values.eventType === "FINISH"
                }
              >
                {players &&
                  players.map((player) => (
                    <Select.Option key={player.id} value={player.id}>
                      {player.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item label="Mốc thời gian" name="eventTime">
              <Input
                type="number"
                name="eventTime"
                onChange={handleChange}
                value={values.eventTime}
              />
            </Form.Item>
            <Form.Item label="Hỗ trợ" name="assistId">
              <Select
                value={values.assistId}
                onChange={(e) => setSelectedAssist(e)}
                disabled={
                  values.eventType === "START" || values.eventType === "FINISH"
                }
              >
                {players &&
                  players.map(
                    (player) =>
                      player.id !== selectedPlayer && (
                        <Select.Option key={player.id} value={player.id}>
                          {player.name}
                        </Select.Option>
                      )
                  )}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                className="mr-4"
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
