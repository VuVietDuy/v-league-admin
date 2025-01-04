import React, { useState } from "react";
import { Form, Input, Button, Upload, message, DatePicker, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho tin tức
interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  image: string; // URL của ảnh
}

const NewsDetails: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Xử lý khi form được submit
  const handleSubmit = (values: any) => {
    const newPost: Post = {
      id: posts.length + 1,
      title: values.title,
      description: values.description,
      content: values.content,
      category: values.category,
      date: values.date.format("YYYY-MM-DD"),
      image: values.image[0]?.url || "",
    };

    setPosts([...posts, newPost]);
    message.success("Đăng tin thành công!");
  };

  // Xử lý upload ảnh
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{ padding: 20 }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        {/* Tiêu đề */}
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        {/* Mô tả ngắn */}
        <Form.Item
          label="Mô tả ngắn"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả ngắn!" },
            { max: 150, message: "Mô tả không được dài hơn 150 ký tự!" },
          ]}
        >
          <TextArea rows={3} placeholder="Nhập mô tả ngắn" maxLength={150} />
        </Form.Item>

        {/* Nội dung */}
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <TextArea rows={6} placeholder="Nhập nội dung bài viết" />
        </Form.Item>

        {/* Chọn danh mục */}
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <Select placeholder="Chọn danh mục bài viết">
            <Option value="thể thao">Thể Thao</Option>
            <Option value="giải trí">Giải Trí</Option>
            <Option value="công nghệ">Công Nghệ</Option>
            <Option value="giáo dục">Giáo Dục</Option>
          </Select>
        </Form.Item>

        {/* Ngày đăng */}
        <Form.Item
          label="Ngày đăng"
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày đăng!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Upload ảnh */}
        <Form.Item
          label="Ảnh đại diện"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Vui lòng tải lên ảnh đại diện!" },
          ]}
        >
          <Upload
            name="logo"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>

        {/* Nút gửi */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng Tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewsDetails;
