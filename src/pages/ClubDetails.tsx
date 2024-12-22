import React, { useState } from "react";
import { Form, Input, Button, Upload, Card, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Club {
  name: string;
  stadium: string;
  foundedYear: string;
  logo: File | null;
}

const ClubDetails: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: Club) => {
    setLoading(true);
    // Xử lý dữ liệu
    console.log("Câu lạc bộ được thêm:", values);

    setTimeout(() => {
      setLoading(false);
      message.success("Câu lạc bộ đã được thêm thành công!");
      form.resetFields();
    }, 1500);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Đã xảy ra lỗi:", errorInfo);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Thêm Câu Lạc Bộ</Title>
      <Card>
        <Form
          form={form}
          name="add-club-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên Câu Lạc Bộ"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên câu lạc bộ!" },
            ]}
          >
            <Input placeholder="Nhập tên câu lạc bộ" />
          </Form.Item>

          <Form.Item
            label="Sân Vận Động"
            name="stadium"
            rules={[{ required: true, message: "Vui lòng nhập sân vận động!" }]}
          >
            <Input placeholder="Nhập tên sân vận động" />
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
            <Input placeholder="Nhập năm thành lập (VD: 1998)" />
          </Form.Item>

          <Form.Item
            label="Logo"
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên logo!" }]}
          >
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Không tự động tải lên
            >
              <Button icon={<UploadOutlined />}>Tải lên logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm Câu Lạc Bộ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ClubDetails;
