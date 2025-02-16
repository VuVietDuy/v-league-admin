import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Button,
  message,
  Image,
  Spin,
} from "antd";
import { useParams } from "react-router-dom";
import { IClub } from "@/type/club";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Loading from "@/components/Loading";

const position = [
  {
    value: "GOALKEEPER",
    name: "Thủ môn",
  },
  {
    value: "DEFENDER",
    name: "Hậu vệ",
  },
  {
    value: "MIDFIELDER",
    name: "Tiền vệ",
  },
  {
    value: "FORWARD",
    name: "Tiền đạo",
  },
];

function PlayerEdit() {
  const { playerId } = useParams();
  const { data: player, isLoading } = useQuery({
    queryKey: ["GET_DETAILS_PLAYER"],
    queryFn: () =>
      fetcher.get(`players/${playerId}`).then((res) => {
        return res.data.data;
      }),
  });

  const { data: clubs, isLoading: isLoadingClubs } = useQuery({
    queryKey: ["GET_LIST_CLUBS_FOR_PLAYER_EDIT"],
    queryFn: () => fetcher.get("clubs").then((res) => res.data),
  });

  if (isLoading) {
    return <Loading />;
  }

  const initialValues = {
    name: player.name,
    dateOfBirth: dayjs(player.dateOfBirth),
    nationality: player.nationality,
    height: player.height,
    weight: player.weight,
    clubId: player.clubId,
    shirtNumber: player.shirtNumber,
    position: player.position,
  };

  const handleSubmit = async (values: any) => {
    const dateOfBirthISO = values.dateOfBirth
      ? values.dateOfBirth.toISOString()
      : "";

    const body = {
      name: values.name,
      dateOfBirth: dateOfBirthISO,
      nationality: values.nationality,
      height: parseInt(values.height),
      weight: parseInt(values.weight),
      shirtNumber: parseInt(values.shirtNumber),
      clubId: parseInt(values.clubId),
      position: values.position,
    };

    try {
      await fetcher.put(`players/${playerId}`, body);

      message.success("Cầu thủ đã được chỉnh sửa thành công!");
      // navigation("/players");
    } catch (error) {
      message.error("Có lỗi xảy ra khi chỉnh sửa cầu thủ!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="Thông tin cầu thủ" bordered={false}>
        <Form
          initialValues={initialValues}
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <label className="block mb-2">Hình ảnh</label>
              <div className="border rounded-lg shadow-md overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={player?.imageURL}
                ></Image>
              </div>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày sinh!" },
                ]}
              >
                <DatePicker placeholder="Ngày sinh" />
              </Form.Item>
              <Form.Item
                label="Quốc tịch"
                name="nationality"
                rules={[
                  { required: true, message: "Vui lòng nhập quốc tịch!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Form.Item
                    label="Chiều cao (cm)"
                    name="height"
                    rules={[
                      { required: true, message: "Vui lòng nhập chiều cao!" },
                    ]}
                  >
                    <Input type="number" placeholder="Chiều cao" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Cân nặng (kg)"
                    name="weight"
                    rules={[
                      { required: true, message: "Vui lòng nhập cân nặng" },
                    ]}
                  >
                    <Input type="number" placeholder="Cân nặng" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Câu lạc bộ"
                name="clubId"
                rules={[
                  { required: true, message: "Vui lòng chọn câu lạc bộ!" },
                ]}
              >
                {isLoadingClubs ? (
                  <Spin />
                ) : (
                  <Select>
                    {clubs.map((item: IClub) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label="Số áo"
                name="shirtNumber"
                rules={[{ required: true, message: "Vui lòng nhập số áo!" }]}
              >
                <Input placeholder="Số áo" />
              </Form.Item>
              <Form.Item
                label="Vị trí"
                name="position"
                rules={[{ required: true, message: "Vui lòng chọn vị trí!" }]}
              >
                <Select>
                  {position.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  className="float-right"
                  type="primary"
                  htmlType="submit"
                >
                  Cập nhật cầu thủ
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default PlayerEdit;
