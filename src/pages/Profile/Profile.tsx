import fetcher from "@/api/fetcher";
import { deleteToken } from "@/store/slice/token.slice";
import { loginUser, logoutUser } from "@/store/slice/user.slice";
import { RootState } from "@/store/store";
import { User } from "@/store/types/user.type";
import { formatDate } from "@/utils/formatDate";
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
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const genders = [
  {
    label: "Nam",
    value: "MALE",
  },
  {
    label: "Nữ",
    value: "FEMALE",
  },
  {
    label: "Khác",
    value: "DEFFERENCE",
  },
];
export const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: dayjs(user.dateOfBirth),
      });
    }
  }, [user]);
  const onFinish = (values: User) => {
    setLoading(true);
    fetcher
      .put(`users/${user?.id} `, values)
      .then((res) => {
        console.log(res.data);
        dispatch(loginUser(res.data));
        // navigate(0);
        message.success("Cập nhật thông tin tài khoản thành công!");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Cập nhật thông tin tài khoản thất bại!");
        console.log(err);
      });
  };

  const handleLogout = () => {
    navigate("/login");
    dispatch(logoutUser());
    dispatch(deleteToken());
  };
  return (
    <div className="w-full mx-2 md:w-[80vw] md:mx-auto py-10">
      <div className="grid grid-cols-12 gap-7 px-8">
        <div className="col-span-12 md:col-span-8">
          <Card>
            <h1 className="text-primary text-2xl font-bold mb-3">
              Thông tin tài khoản
            </h1>

            <Form
              form={form}
              name="add-club-form"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="Địa chỉ Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ Email!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tên người dùng"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên người dùng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Select>
                  {genders.map((gender, index) => (
                    <Select.Option key={index} value={gender.value}>
                      <div className="flex gap-4 items-center">
                        <span>{gender.label}</span>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày sinh!" },
                ]}
              >
                <DatePicker placeholder="" className="w-full" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="float-right mt-6"
                  htmlType="submit"
                  loading={loading}
                >
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Card>
            <div className="flex item-center flex-wrap gap-1">
              <h3 className="text-lg">
                Bạn đang đăng nhập với tài khoản người dùng
              </h3>
              <span className="text-lg font-semibold">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full justify-center items-center p-2 font-bold text-white h-[40px] rounded-md mt-5 hover:opacity-85 bg-blue-500"
            >
              Đăng xuất
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
