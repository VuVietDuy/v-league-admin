import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Table,
  TableProps,
} from "antd";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IPlayer } from "@/type/player";
import fetcher from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { renderPositionText } from "@/utils/renderPositionText";

export default function ClubDetail() {
  const { clubId } = useParams();
  const { data: club, isLoading: isLoadingClubData } = useQuery({
    queryKey: ["GET_DETAIL_CLUB_INFO"],
    queryFn: () =>
      fetcher.get(`clubs/${clubId}/players`).then((res) => res.data.data),
  });

  const columns: TableProps<IPlayer>["columns"] = [
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => (
        <Avatar shape="square" size="large" src={record.imageURL} />
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Vị trí thi đấu",
      dataIndex: "position",
      key: "position",
      render: (value) => <>{renderPositionText(value)}</>,
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">
            <EditOutlined />
          </Button>
          <Button type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {isLoadingClubData ? (
        <Loading />
      ) : (
        <div>
          <Card className="m-6">
            <h1 className="text-2xl mb-2">Thông tin câu lạc bộ</h1>
            <Form initialValues={club} layout="vertical">
              <Row gutter={[24, 14]}>
                <Col span={6}>
                  <Form.Item label="Logo" name="logo">
                    <Image src={club?.logoURL}></Image>
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item label="Tên Câu Lạc Bộ" name="name">
                    <Input value={club?.name} />
                  </Form.Item>

                  <Form.Item label="Tên viết tắt" name="shortName">
                    <Input value={club?.shortName} />
                  </Form.Item>

                  <Form.Item label="Năm Thành Lập" name="foundedYear">
                    <Input value={club?.foundedYear} />
                  </Form.Item>

                  <Form.Item label="Huấn luyện viên" name="coach">
                    <Input value={club?.coach} />
                  </Form.Item>

                  <Form.Item label="Sân Vận Động" name="stadium">
                    <Input value={club?.stadium} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="m-6">
            <h1 className="text-2xl mb-2">Danh sách cầu thủ</h1>
            <Table<IPlayer>
              rowKey={"id"}
              columns={columns}
              dataSource={club.players}
            />
          </Card>
        </div>
      )}
    </div>
  );
}
