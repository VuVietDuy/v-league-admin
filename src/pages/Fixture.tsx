import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Popconfirm,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import dayjs, { Dayjs } from "dayjs";

// Định nghĩa kiểu dữ liệu cho lịch thi đấu
interface Match {
  id: number;
  team1: string;
  team2: string;
  matchDate: string; // Ngày thi đấu ở định dạng chuỗi
  location: string;
}

const Fixture: React.FC = () => {
  // State quản lý danh sách lịch thi đấu
  const [scheduleData, setScheduleData] = useState<Match[]>([
    {
      id: 1,
      team1: "Team A",
      team2: "Team B",
      matchDate: "2024-12-25",
      location: "Stadium 1",
    },
    {
      id: 2,
      team1: "Team C",
      team2: "Team D",
      matchDate: "2024-12-28",
      location: "Stadium 2",
    },
  ]);

  // State cho modal thêm/sửa
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  // Form instance của Ant Design
  const [form] = Form.useForm();

  // Mở modal thêm hoặc chỉnh sửa
  const openModal = (match: Match | null = null) => {
    setCurrentMatch(match);
    if (match) {
      form.setFieldsValue({
        team1: match.team1,
        team2: match.team2,
        matchDate: dayjs(match.matchDate),
        location: match.location,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMatch(null);
  };

  // Lưu lịch thi đấu (thêm hoặc chỉnh sửa)
  const saveMatch = () => {
    form.validateFields().then((values) => {
      const newMatch: Omit<Match, "id"> = {
        ...values,
        matchDate: values.matchDate.format("YYYY-MM-DD"),
      };

      if (currentMatch) {
        // Cập nhật lịch thi đấu
        setScheduleData((prev) =>
          prev.map((item) =>
            item.id === currentMatch.id ? { ...item, ...newMatch } : item
          )
        );
      } else {
        // Thêm lịch thi đấu mới
        setScheduleData((prev) => [
          ...prev,
          { id: prev.length + 1, ...newMatch },
        ]);
      }

      closeModal();
    });
  };

  // Xóa lịch thi đấu
  const deleteMatch = (id: number) => {
    setScheduleData((prev) => prev.filter((item) => item.id !== id));
  };

  // Cột của bảng
  const columns: ColumnsType<Match> = [
    {
      title: "Đội 1",
      dataIndex: "team1",
      key: "team1",
    },
    {
      title: "Đội 2",
      dataIndex: "team2",
      key: "team2",
    },
    {
      title: "Ngày thi đấu",
      dataIndex: "matchDate",
      key: "matchDate",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa lịch này?"
            onConfirm={() => deleteMatch(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 20 }}
      >
        Thêm Lịch Thi Đấu
      </Button>
      <Table dataSource={scheduleData} columns={columns} rowKey="id" />

      <Modal
        title={currentMatch ? "Sửa Lịch Thi Đấu" : "Thêm Lịch Thi Đấu"}
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={saveMatch}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Đội 1"
            name="team1"
            rules={[{ required: true, message: "Vui lòng nhập tên đội 1!" }]}
          >
            <Input placeholder="Tên đội 1" />
          </Form.Item>
          <Form.Item
            label="Đội 2"
            name="team2"
            rules={[{ required: true, message: "Vui lòng nhập tên đội 2!" }]}
          >
            <Input placeholder="Tên đội 2" />
          </Form.Item>
          <Form.Item
            label="Ngày thi đấu"
            name="matchDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày thi đấu!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
          >
            <Input placeholder="Địa điểm thi đấu" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Fixture;
