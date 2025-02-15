import fetcher from "@/api/fetcher";
import { position } from "@/data/position";
import { IClub } from "@/type/club";
import { IPlayer } from "@/type/player";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PlayerDetail() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [player, setPlayer] = useState<IPlayer>();
  const { playerId } = useParams();

  useEffect(() => {
    fetcher.get(`players/${playerId}`).then((res) => {
      setPlayer(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const [fileList, setFileList] = useState<FileType[]>([]);
  const [clubs, setClubs] = useState<IClub[]>([]);
  const navigation = useNavigate();
  const [isUploadImg, setIsUploadImg] = useState<boolean>([]);
  console.log(playerId);

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

    const dateOfBirthISO = values.dateOfBirth
      ? values.dateOfBirth.toISOString()
      : "";

    formData.append("name", values.name);
    formData.append("dateOfBirth", dateOfBirthISO); // Use ISO format
    formData.append("nationality", values.nationality);
    formData.append("height", values.height);
    formData.append("clubId", values.clubId);
    formData.append("position", values.position);

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj as Blob);
    }
    console.log(values);
    try {
      // const res = await fetcher.put("players", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      message.success("Cầu thủ đã được thêm thành công!");
      navigation("/players");
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm cầu thủ!");
      console.error(error);
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (player) {
      form.setFieldsValue({
        nationality: player.nationality,
        name: player.name,
        height: player.height,
        dateOfBirth: dayjs(player.dateOfBirth),
        // dateOfBirth:
        clubId: player.clubId,
        position: player.position,
      });
    }
  }, [player, form]);
  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>Thông tin cầu thủ</span>
            <Button type="primary" onClick={() => setIsEdit(true)}>
              <EditOutlined />
            </Button>
          </div>
        }
        bordered={false}
      >
        <Form
          initialValues={{
            nationality: player?.nationality,
            name: player?.name,
          }}
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[24, 14]}>
            <Col span={6}>
              {isEdit ? (
                <Form.Item label="Hình ảnh" name="image">
                  <Upload
                    className="w-[200px] h-[200px] rounded-md overflow-hidden"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                  >
                    {isUploadImg ? (
                      <div className="absolute inset-0 z-20">
                        <UploadOutlined />
                        {/* <div style={{ marginTop: 8 }}>Upload</div> */}
                      </div>
                    ) : (
                      <img
                        onMouseEnter={() => setIsUploadImg(true)}
                        onMouseLeave={() => setIsUploadImg(false)}
                        src={player?.imageURL}
                        alt="playerAvt"
                        className="object-cover"
                      />
                    )}
                  </Upload>
                </Form.Item>
              ) : (
                <div className="w-[200px] h-[200px] rounded-md overflow-hidden">
                  <img
                    src={player?.imageURL}
                    alt="playerAvt"
                    className="object-cover"
                  />
                </div>
              )}
            </Col>
            <Col span={18}>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày sinh!" },
                ]}
              >
                <DatePicker disabled={!isEdit} placeholder="Ngày sinh" />
              </Form.Item>
              <Form.Item
                label="Quốc tịch"
                name="nationality"
                rules={[
                  { required: true, message: "Vui lòng nhập quốc tịch!" },
                ]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              <Form.Item
                label="Chiều cao"
                name="height"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều cao!" },
                ]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              <Form.Item
                label="Câu lạc bộ"
                name="clubId"
                className="select-none"
                rules={[
                  { required: true, message: "Vui lòng chọn câu lạc bộ!" },
                ]}
              >
                <Select disabled={!isEdit} className="select-none">
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
                <Select disabled={!isEdit}>
                  {position.map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {isEdit && (
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Cập nhật cầu thủ
                  </Button>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
