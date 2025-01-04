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
import { position } from "../data/position";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib";
import { IClub } from "../type/club";
import { useNavigate } from "react-router-dom";
import fetcher from "../api/fetcher";

interface FileType extends UploadFile {}

function PlayerDetails() {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const navigation = useNavigate();

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

    // Convert dateOfBirth to ISO format (YYYY-MM-DD)
    const dateOfBirthISO = values.dateOfBirth
      ? values.dateOfBirth.toISOString()
      : "";

    // Append the form fields to FormData
    formData.append("name", values.name);
    formData.append("dateOfBirth", dateOfBirthISO); // Use ISO format
    formData.append("nationality", values.nationality);
    formData.append("height", values.height);
    formData.append("clubId", values.clubId);
    formData.append("position", values.position);

    // Append the uploaded file (if any) to FormData
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj as Blob);
    }

    try {
      // Send the FormData to your API endpoint
      const res = await fetcher.post("players", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      message.success("Cầu thủ đã được thêm thành công!");
      console.log(res.data);
      navigation("/players"); // Navigate to player list after successful submission
    } catch (error) {
      // Handle error
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
              <Form.Item
                label="Chiều cao"
                name="height"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều cao!" },
                ]}
              >
                <Input />
              </Form.Item>
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
                <Button type="primary" htmlType="submit">
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

export default PlayerDetails;
