import { Avatar, Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { IClub } from "../../type/club";
import { FormProps, useNavigate, useParams } from "react-router-dom";
import fetcher from "../../api/fetcher";
import { TableProps } from "antd/lib";
import { TableRowSelection } from "antd/es/table/interface";

const columns: TableProps<IClub>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Logo",
    key: "logo",
    render: (_, record) => (
      <Avatar shape="square" size="large" src={record.logoURL} />
    ),
  },
  {
    title: "Tên câu lạc bộ",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Sân vận động",
    dataIndex: "stadium",
    key: "stadium",
  },
  {
    title: "Huấn luyện viên",
    dataIndex: "coach",
    key: "coach",
  },
];

export default function SearchClub({ ...props }) {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { tournament } = useParams();
  const navigation = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IClub> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
  const hasSelected = selectedRowKeys.length > 0;
  const onFinish = () => {
    console.log("Selected Clubs:", selectedRowKeys);
    fetcher
      .post(`seasons/clubs`, {
        tournamentId: tournament,
        clubs: selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Modal
      {...props}
      width={1000}
      title={`Thêm câu lạc bộ (${
        hasSelected ? `Đã chọn ${selectedRowKeys.length} đội bóng` : null
      })`}
      footer={[]}
    >
      <Form name="add-club-seaso-fomr" layout="vertical" onFinish={onFinish}>
        <Table<IClub>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={clubs}
          rowKey="id"
        />
        <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
          <Button type="primary" htmlType="submit" disabled={!hasSelected}>
            Xác nhận
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={props.onCancel}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
