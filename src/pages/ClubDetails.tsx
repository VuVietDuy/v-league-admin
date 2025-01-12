import React, { useState } from "react";
import { Form, Input, Button, Upload, Card, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib";
import TextArea from "antd/es/input/TextArea";
import fetcher from "../api/fetcher";
import { useNavigate } from "react-router-dom";

interface Club {
  name: string;
  shortName: string;
  foundedYear: string;
  coach: string;
  stadium: string;
  stadiumDescription: string;
  logo: File | null;
}

interface FileType extends UploadFile {}

const ClubDetails: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<FileType[]>([]);
  const navigate = useNavigate();

  const onFinish = (values: Club) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("shortName", values.shortName);
    formData.append("foundedYear", values.foundedYear);
    formData.append("coach", values.coach);
    formData.append("stadium", values.stadium);
    formData.append("stadiumDescription", values.stadiumDescription);

    if (fileList.length > 0) {
      formData.append("logo", fileList[0].originFileObj as File);
    }
    fetcher
      .post("clubs", formData)
      .then((res) => {
        navigate("/clubs");
        message.success("Câu lạc bộ đã được thêm thành công!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: FileType[];
  }) => {
    setFileList(newFileList);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Form
          form={form}
          name="add-club-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <Form.Item
                label="Logo"
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "Vui lòng tải lên logo!" }]}
              >
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
                label="Tên Câu Lạc Bộ"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên câu lạc bộ!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tên viết tắt"
                name="shortName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên viết tắt!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Năm Thành Lập"
                name="foundedYear"
                rules={[
                  { required: true, message: "Vui lòng nhập năm thành lập!" },
                  {
                    pattern: /^\d{4}$/,
                    message: "Năm thành lập phải là 4 chữ số!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Huấn luyện viên"
                name="coach"
                rules={[
                  { required: true, message: "Vui lòng nhập sân vận động!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Sân Vận Động"
                name="stadium"
                rules={[
                  { required: true, message: "Vui lòng nhập sân vận động!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Mô tả sân vận động" name="stadiumDescription">
                <TextArea rows={6} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Thêm Câu Lạc Bộ
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ClubDetails;
