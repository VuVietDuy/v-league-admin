import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Switch,
  Upload,
} from "antd";
import { UploadFile } from "antd/lib";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../../api/fetcher";
const { TextArea } = Input;

type FieldType = {
  tournamentId: string;
  isActive: boolean;
  seasonName?: string;
  startDate?: string;
  endDate?: string;
  description: string;
};

export default function CreateSeason() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { tournament } = useParams();
  const navigate = useNavigate();
  const initalValues = {
    tournamentId: tournament,
    seasonName: "",
    description: "",
    isActive: true,
    startDate: "",
    endDate: "",
  };

  console.log(tournament);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    setLoading(true);
    console.log(values);
    const formData = new FormData();

    formData.append("name", values.seasonName);
    if (fileList.length > 0)
      formData.append("logo", fileList[0].originFileObj as Blob);
    formData.append("description", values.description);
    formData.append("startDate", values.startDate.toISOString());
    formData.append("endDate", values.endDate.toISOString());
    formData.append("tournamentId", values.tournamentId);
    formData.append("isActive", values.isActive);

    fetcher
      .post("seasons", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate(`/current-season/${tournament}`);
        message.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };
  return (
    <Card className="m-6">
      <Form layout="vertical" onFinish={onFinish} initialValues={initalValues}>
        <Form.Item<FieldType>
          label="Id giải đấu"
          name="tournamentId"
          className="hidden"
        >
          <Input />
        </Form.Item>
        <Row gutter={[24, 0]}>
          <Col span={6}>
            <Form.Item label="Logo mùa giải">
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
            <Form.Item<FieldType>
              label="Tên mùa giải"
              name="seasonName"
              rules={[
                { required: true, message: "Vui lòng điền tên mùa giải" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Ngày bắt đầu"
              name="startDate"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>{" "}
            <Form.Item<FieldType>
              label="Ngày kết thúc"
              name="endDate"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item<FieldType> label="Mô tả" name="description">
              <TextArea rows={6} />
            </Form.Item>
            <Form.Item<FieldType> label="Mùa giải đang diễn ra" name="isActive">
              <Switch defaultChecked />
            </Form.Item>
            <div className="flex justify-end">
              <Button loading={loading} type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
