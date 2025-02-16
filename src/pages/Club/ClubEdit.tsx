import React, { useState } from "react";
import { Form, Input, Button, Card, message, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import fetcher from "../../api/fetcher";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";

interface Club {
  name: string;
  shortName: string;
  foundedYear: string;
  coach: string;
  stadium: string;
  stadiumDescription: string;
  stadiumCapacity: string;
  stadiumAddress: string;
  stadiumMap: string;
}

const ClubEdit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { clubId } = useParams();

  const { data: club, isLoading } = useQuery({
    queryKey: ["GET_CLUB_PLAYER"],
    queryFn: () =>
      fetcher.get(`clubs/${clubId}`).then((res) => {
        return res.data.data;
      }),
  });

  if (isLoading) {
    return <Loading />;
  }

  const initValues = {
    name: club.name,
    shortName: club.shortName,
    foundedYear: club.foundedYear,
    coach: club.coach,
    stadium: club.stadium,
    stadiumDescription: club.stadiumDescription,
    stadiumCapacity: club.stadiumCapacity,
    stadiumAddress: club.stadiumAddress,
    stadiumMap: club.stadiumMap,
  };

  const onFinish = (values: Club) => {
    setLoading(true);
    const body = {
      name: values.name,
      shortName: values.shortName,
      foundedYear: parseInt(values.foundedYear),
      coach: values.coach,
      stadium: values.stadium,
      stadiumDescription: values.stadiumDescription,
      stadiumCapacity: parseInt(values.stadiumCapacity),
      stadiumAddress: values.stadiumAddress,
      stadiumMap: values.stadiumMap,
    };
    console.log(body);

    fetcher
      .patch(`clubs/${club?.id} `, body)
      .then((res) => {
        message.success("Chỉnh sửa thông tin câu lạc bộ thành công!");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        initialValues={initValues}
        name="add-club-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Card>
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <div className="w-full h-[230px] shadow-md overflow-hidden rounded-md">
                <img
                  src={club?.logoURL}
                  alt="logo"
                  className="object-contain w-full h-full"
                />
              </div>
            </Col>
            <Col span={18}>
              <Row gutter={[24, 14]}>
                <Col span={12}>
                  <Form.Item
                    label="Tên Câu Lạc Bộ"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên câu lạc bộ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên viết tắt"
                    name="shortName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên viết tắt!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

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
            </Col>
          </Row>
        </Card>

        <Card className="mt-6">
          <Col span={24}>
            <Row gutter={[24, 14]}>
              <Col span={12}>
                <Form.Item
                  label="Sân Vận Động"
                  name="stadium"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập sân vận động!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sức chứa SVĐ" name="stadiumCapacity">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Form.Item label="Địa chỉ SVĐ" name="stadiumAddress">
            <Input />
          </Form.Item>

          <Form.Item label="Bản đồ SVĐ" name="stadiumMap">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả SVĐ" name="stadiumDescription">
            <TextArea rows={6} />
          </Form.Item>
        </Card>
        <Form.Item>
          <Button
            type="primary"
            className="float-right mt-6"
            htmlType="submit"
            loading={loading}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClubEdit;
