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

interface FileType extends UploadFile {}

const position = [
  {
    key: "GOALKEEPER",
    name: "Thủ môn",
  },
  {
    key: "DEFENDER",
    name: "Hậu vệ",
  },
  {
    key: "MIDFIELDER",
    name: "Tiền vệ",
  },
  {
    key: "FORWARD",
    name: "Tiền đạo",
  },
];

function PlayerCreate() {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const navigation = useNavigate();
  const { playerId } = useParams();
  console.log(playerId);

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

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: FileType[];
  }) => {
    setFileList(newFileList);
  };

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
    formData.append("shirtNumber", values.shirtNumber);
    formData.append("position", values.position);

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj as Blob);
    }

    try {
      const res = await fetcher.post("players", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Cầu thủ đã được thêm thành công!");
      navigation("/players");
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm cầu thủ!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card title="Thông tin cầu thủ" bordered={false}>
        <Form name="basic" layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <Form.Item label="Hình ảnh" name="image">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={() => false}
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
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
                  <Form.Item label="Chiều cao" name="height">
                    <Input placeholder="Chiều cao" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Cân nặng" name="weight">
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
                    <Select.Option key={item.key} value={item.key}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="float-right"
                  htmlType="submit"
                >
                  Thêm cầu thủ
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default PlayerCreate;
