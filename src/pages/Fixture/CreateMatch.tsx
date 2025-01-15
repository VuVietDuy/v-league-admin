import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetcher from "../../api/fetcher";
import { IClub } from "../../type/club";
import dayjs from "dayjs";

interface Match {
  id: number;
  homeClub: string;
  awayClub: string;
  stadium: string;
  date: string;
  time: string;
}

export default function CreateMatch({ ...props }) {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const { tournament } = useParams();
  const [form] = Form.useForm();
  const {} = props;

  const saveMatch = () => {
    form.validateFields().then((values) => {
      const data: Omit<Match, "id"> = {
        ...values,
        date: new Date(
          `${values.date.format("YYYY-MM-DD")}T${values.time.format(
            "HH:mm"
          )}:00Z`
        ).toISOString(),
        time: values.time.format("HH:mm"),
        tournamentId: tournament,
      };
      fetcher.post("matches", data).then((res) => {
        message.success(res.data.message);
        props.onCancel();
      });
    });
  };

  useEffect(() => {
    fetcher
      .get(`seasons/${tournament}/clubs`)
      .then((res) => {
        setClubs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      title={"Thêm Lịch Thi Đấu"}
      okText="Lưu"
      cancelText="Hủy"
      onOk={saveMatch}
      {...props}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Đội 1"
          name="homeClubId"
          rules={[{ required: true, message: "Vui lòng nhập tên đội 1!" }]}
        >
          <Select>
            {clubs.map((club, index) => (
              <Select.Option key={index} value={club.id}>
                <div className="flex gap-4 items-center">
                  <img className="w-4" src={club.logoURL} alt="" />{" "}
                  <span>{club.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Đội 2"
          name="awayClubId"
          rules={[{ required: true, message: "Vui lòng nhập tên đội 2!" }]}
        >
          <Select>
            {clubs.map((club, index) => (
              <Select.Option key={index} value={club.id}>
                <div className="flex gap-4 items-center">
                  <img className="w-4" src={club.logoURL} alt="" />{" "}
                  <span>{club.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Ngày thi đấu"
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày thi đấu!" }]}
        >
          <DatePicker placeholder="" className="w-full" format={"YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item label="Giờ thi đấu" name="time">
          <TimePicker
            placeholder=""
            className="w-full"
            defaultOpenValue={dayjs("00:00:00", "HH:mm")}
            format={"HH:mm"}
          />
        </Form.Item>
        <Form.Item
          label="Địa điểm"
          name="stadium"
          rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
