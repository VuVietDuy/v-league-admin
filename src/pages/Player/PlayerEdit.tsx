import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib";
import { useNavigate, useParams } from "react-router-dom";
import { IClub } from "@/type/club";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { renderPositionText } from "@/utils/renderPositionText";

interface FileType extends UploadFile {}

const position = [
  {
    key: "Goalkeeper",
    name: "Thủ môn",
  },
  {
    key: "Defender",
    name: "Hậu vệ",
  },
  {
    key: "Midfielder",
    name: "Tiền vệ",
  },
  {
    key: "Forward",
    name: "Tiền đạo",
  },
];

function PlayerEdit() {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const navigation = useNavigate();
  const { playerId } = useParams();
  const { data: player, isLoading } = useQuery({
    queryKey: ["GET_DETAILS_PLAYER"],
    queryFn: () =>
      fetcher.get(`players/${playerId}`).then((res) => {
        return res.data.data;
      }),
  });
  console.log("check player", player);

  const [form] = Form.useForm();
  useEffect(() => {
    if (player) {
      form.setFieldsValue({
        name: player.name,
        dateOfBirth: dayjs(player.dateOfBirth),
        nationality: player.nationality,
        height: player.height,
        weight: player.weight,
        clubId: player.clubId,
        position: renderPositionText(player.position),
      });
      setFileList([
        {
          uid: player.id,
          name: player.avatar,
          status: "done",
          url: player.avatar,
        },
      ]);
    }
  }, [player]);

  useEffect(() => {
    const getClubs = async () => {
      await fetcher
        .get("clubs")
        .then((res) => {
          setClubs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getClubs();
  }, []);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    const dateOfBirthISO = values.dateOfBirth
      ? values.dateOfBirth.toISOString()
      : "";

    formData.append("name", values.name);
    formData.append("dateOfBirth", dateOfBirthISO); // Use ISO format
    formData.append("nationality", values.nationality);
    formData.append("height", values.height);
    formData.append("weight", values.weight);
    formData.append("clubId", values.clubId);
    formData.append("position", values.position);

    try {
      const res = await fetcher.put(`players/${playerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Cầu thủ đã được chỉnh sửa thành công!");
      navigation("/players");
    } catch (error) {
      message.error("Có lỗi xảy ra khi chỉnh sửa cầu thủ!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="Thông tin cầu thủ" bordered={false}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <div className="w-[230px] h-[230px] rounded-md shadow-md overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={player?.imageURL}
                  alt="avatar"
                />
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
                  <Form.Item label="Chiều cao (cm)" name="height">
                    <Input placeholder="Chiều cao" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Cân nặng (kg)" name="weight">
                    <Input placeholder="Cân nặng" />
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
                <Select>
                  {clubs.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Vị trí"
                name="position"
                rules={[{ required: true, message: "Vui lòng chọn vị trí!" }]}
              >
                <Select>
                  {position.map((item) => (
                    <Select.Option key={item.key} value={item.key}>
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
