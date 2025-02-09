import React, { useState } from "react";
import { Typography, Card, Button, Modal, Form, Input, message } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface Regulation {
  id: number;
  title: string;
  content: string;
}

const CategoryList: React.FC = () => {
  // State để lưu danh sách điều lệ
  const [regulations, setRegulations] = useState<Regulation[]>([
    {
      id: 1,
      title: "Điều lệ 1: Đội bóng tham gia",
      content:
        "Các đội bóng tham gia phải đăng ký đầy đủ thông tin trước thời hạn. Mỗi đội tối đa 15 cầu thủ, bao gồm 11 cầu thủ chính thức và 4 cầu thủ dự bị.",
    },
    {
      id: 2,
      title: "Điều lệ 2: Trang phục thi đấu",
      content:
        "Các đội phải có trang phục đồng bộ, bao gồm áo đấu, quần và giày. Số áo phải rõ ràng và không trùng lặp giữa các cầu thủ trong đội.",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRegulation, setEditingRegulation] = useState<Regulation | null>(
    null
  );

  // Hiển thị modal thêm/sửa điều lệ
  const showModal = (regulation?: Regulation) => {
    if (regulation) {
      setEditingRegulation(regulation);
    } else {
      setEditingRegulation(null);
    }
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xử lý khi lưu điều lệ
  const handleSave = (values: any) => {
    if (editingRegulation) {
      // Sửa điều lệ
      const updatedRegulations = regulations.map((reg) =>
        reg.id === editingRegulation.id
          ? { ...reg, title: values.title, content: values.content }
          : reg
      );
      setRegulations(updatedRegulations);
      message.success("Cập nhật điều lệ thành công!");
    } else {
      // Thêm mới điều lệ
      const newRegulation: Regulation = {
        id: regulations.length + 1,
        title: values.title,
        content: values.content,
      };
      setRegulations([...regulations, newRegulation]);
      message.success("Thêm điều lệ mới thành công!");
    }
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Điều Lệ Giải Bóng</Title>
      <div style={{ marginBottom: 20 }}>
        {regulations.map((regulation) => (
          <Card
            key={regulation.id}
            title={regulation.title}
            style={{ marginBottom: 16 }}
            extra={
              <Button type="link" onClick={() => showModal(regulation)}>
                Sửa
              </Button>
            }
          >
            <Paragraph>{regulation.content}</Paragraph>
          </Card>
        ))}
      </div>

      <Button type="primary" onClick={() => showModal()}>
        Thêm Điều Lệ
      </Button>

      {/* Modal thêm/sửa điều lệ */}
      <Modal
        title={editingRegulation ? "Sửa Điều Lệ" : "Thêm Điều Lệ"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={
            editingRegulation
              ? {
                  title: editingRegulation.title,
                  content: editingRegulation.content,
                }
              : undefined
          }
        >
          <Form.Item
            label="Tiêu đề điều lệ"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề điều lệ" />
          </Form.Item>
          <Form.Item
            label="Nội dung điều lệ"
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <TextArea rows={4} placeholder="Nhập nội dung điều lệ" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
