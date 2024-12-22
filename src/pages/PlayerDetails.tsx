import { Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import GlobalUpload from "../components/GlobalUpload";
import { position } from "../data/position";

function PlayerDetails() {
  return (
    <div style={{ padding: "24px" }}>
      <Card title="Thông tin cầu thủ" bordered={false}>
        <Form name="basic" layout="vertical">
          <Form.Item label="Hình ảnh" name="image">
            <GlobalUpload />
          </Form.Item>
          <Form.Item label="Họ tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker placeholder="Ngày sinh" />
          </Form.Item>
          <Form.Item label="Quốc tịch" name="nation">
            <Input />
          </Form.Item>
          <Form.Item label="Chiều cao" name="height">
            <Input />
          </Form.Item>
          <Form.Item label="Câu lạc bộ" name="club">
            <Input />
          </Form.Item>
          <Form.Item label="Vị trí" name="position">
            <Select>
              {position.map((item) => (
                <Select.Option value={item.key}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PlayerDetails;
