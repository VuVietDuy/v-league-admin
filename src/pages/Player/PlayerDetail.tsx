import fetcher from "@/api/fetcher";
import Loading from "@/components/Loading";
import { renderPositionText } from "@/utils/renderPositionText";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { Link, useParams } from "react-router-dom";

export default function PlayerDetail() {
  const { playerId } = useParams();

  const { data: player, isLoading } = useQuery({
    queryKey: ["GET_DETAILS_PLAYER"],
    queryFn: () =>
      fetcher.get(`players/${playerId}/stats`).then((res) => {
        return res.data;
      }),
  });

  const cardData = [
    {
      label: "Số trận thi đấu",
      value: player?.appearances,
    },
    {
      label: "Số trận thắng",
      value: player?.wins,
    },
    {
      label: "Số trận thua",
      value: player?.losses,
    },
    {
      label: "Bàn thắng",
      value: player?.goals,
    },
  ];
  const attack = {
    "Bàn thắng": player?.goals,
    "Bàn thắng mỗi trận": player?.goalPerMatch,
    "Số lần dứt điểm": player?.shots,
    "Dứt điểm trúng đích": player?.shotsOnTarget,
    "Dứt điểm chính xác": `${player?.shootingAccuracy}%`,
    "Bàn thắng penalty": 86,
    "Cơ hội tạo ra": player?.keyPass,
    "Bóng chạm khung thành": 30,
  };
  const teamPlay = {
    "Số đường chuyền": 377,
    "Đường chuyền mỗi trận": 39,
    "Chuyền chính xác": "84%",
    "Số lần tạt bóng": 127,
    "Tạt bóng chính xác": "21%",
  };
  const defence = {
    "Số trận sạch lưới": player?.cleanSheets,
    "Số bàn thua": player?.cleanSheets,
    "Bàn thua mỗi trận": 0.99,
    "Cứu thua": 174,
    "Tắc bóng": 1318,
    "Tắc bóng thành công": "70%",
    "Cản phá cú sút": 287,
    "Truy cản": 287,
    "Phá bóng": 178,
    "Phá bóng bằng đầu": 67,
    "Tranh chấp tay đôi": 413,
    "Phạm lỗi dẫn đén bàn thua": 19,
    "Phản lưới": 0,
  };
  const discipline = {
    "Thẻ vàng": player?.yellowCard,
    "Thẻ đỏ": player?.redCard,
    "Phạm lỗi": 247,
    "Việt vị": 159,
  };

  function formatBirthDate(dateString: any): string {
    const now = new Date();
    const date = new Date(dateString);
    const birthYear = date?.getFullYear();
    const birthMonth = date?.getMonth();
    const birthDay = date?.getDate();

    let age = now.getFullYear() - (birthYear ?? 0);
    if (
      birthMonth !== undefined &&
      birthDay !== undefined &&
      (now.getMonth() < birthMonth ||
        (now.getMonth() === birthMonth && now.getDate() < birthDay))
    ) {
      age--;
    }

    const formattedDate = date?.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${formattedDate} (${age})`;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{ padding: "24px" }}>
      <Card title={"Thông tin cầu thủ"} bordered={false}>
        <div className="container m-auto grid grid-cols-4 h-fit pb-10 ">
          <div className="col-span-4 flex   items-center   ">
            <div className="w-[150px] h-[150px] md:w-[230px] md:h-[230px]   shadow-xl rounded-lg overflow-hidden    ">
              {
                <img
                  className="w-full h-full object-cover"
                  src={player?.imageURL}
                  alt=""
                />
              }
            </div>
            <div className="flex-1 flex flex-col  pl-6  ">
              <div className="flex flex-1 h-[230px] justify-between items-center   ">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-end">
                    <p className=" text-3xl md:text-5xl  ">{player?.name}</p>
                    <span className="text-lg font-semibold">
                      {"(" + renderPositionText(player?.position) + ")"}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                      <img
                        src={player?.club?.logoURL}
                        alt="avatar"
                        className="object-cover w-full h-full "
                      />
                    </div>
                    <p className=" text-3xl md:text-xl  ">
                      {player?.club.name}
                    </p>
                  </div>
                </div>

                <p className="text-[135px] md:text-[180px] leading-[180px] font-bold">
                  {player?.shirtNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 col-span-4">
            <div className="rounded-md border grid grid-cols-3 border-slate-200 py-7  px-4">
              <div className=" col-span-1 pr-8 flex justify-between border border-y-0 border-l-0 border-r-slate-200">
                <span className="text-sm font-light">Quốc tịch</span>
                <span className="text-md font-semibold">
                  {player?.nationality}
                </span>
              </div>
              <div className=" col-span-1 px-8 flex justify-between border border-y-0 border-l-0 border-r-slate-200">
                <span className="text-sm font-light">Ngày sinh</span>
                <span className="text-md font-semibold">
                  {formatBirthDate(player?.dateOfBirth)}
                </span>
              </div>
              <div className=" col-span-1 pl-8 flex justify-between border border-y-0 border-l-0 border-r-slate-200">
                <span className="text-sm font-light">Chiều cao</span>
                <span className="text-md font-semibold">
                  {player?.height + "cm"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-wrap  items-start   ">
            {/* Left content  */}
            <div className="w-full   lg:w-[330px] h-fit  relative ">
              <div className="block rounded-md border mt-7 py-2 text-primary">
                <div className="border border-x-0 border-t-0 border-b-slate-200 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Câu lạc bộ</span>
                  <span className="text-md font-semibold">
                    {player?.club?.name}
                  </span>
                </div>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Vị trí</span>
                  <span className="text-md font-semibold">
                    {renderPositionText(player?.position)}
                  </span>
                </div>

                <div className=" px-4 py-2.5 flex flex-col gap-2 items-start justify-between">
                  <span className="text-md font-light">
                    Theo dõi
                    <span className="text-md ml-2">{player?.name + " "}</span>
                  </span>
                  <div className="flex items-center gap-3 ">
                    <Link
                      className="text-gray-700 hover:text-primary p-1.5 border rounded flex items-center justify-center"
                      to={player?.instagram}
                    >
                      <InstagramOutlined className="text-2xl" />
                    </Link>
                    <Link
                      className="text-gray-700 hover:text-primary p-1.5 border rounded flex items-center justify-center"
                      to={player?.facebook}
                    >
                      <FacebookOutlined className="text-2xl" />
                    </Link>
                  </div>
                </div>

                {/* League record  */}
                <p className="text-xl font-bold px-2 ">Thông số giải đấu</p>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Ra sân</span>
                  <span className="text-md font-semibold">
                    {player?.appearances}
                  </span>
                </div>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Bàn thắng</span>
                  <span className="text-md font-semibold">{player?.goals}</span>
                </div>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Kiến tạo</span>
                  <span className="text-md font-semibold">
                    {player?.assists}
                  </span>
                </div>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Giữ sạch lưới</span>
                  <span className="text-md font-semibold">
                    {player?.cleanSheets}
                  </span>
                </div>

                {/* Awards  */}
                <p className="text-xl font-bold px-2 mt-3">
                  Giải thương và vinh danh
                </p>
                <div className=" px-4 py-2.5 flex items-center justify-between">
                  <span className="text-md font-light">Quả bóng vàng</span>
                  <span className="text-md font-semibold">{2024}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 px-2 md:px-0 flex flex-col col-span-8 mt-5 lg:pl-6 p-0 min-h-[230px] ">
              <div className="grid grid-cols-8 gap-3 mt-2">
                {cardData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 col-span-4 md:col-span-2 rounded-md bg-[#fffffd] border"
                    >
                      <p className="text-md font-light mb-3.5 text-primary">
                        {item.label}
                      </p>
                      <p className="md:text-5xl text-4xl font-bold text-primary">
                        {" "}
                        {item?.value?.toLocaleString("en-US")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-4 gap-2.5 mt-6">
                <div className="col-span-4 md:col-span-2 text-primary">
                  <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-green-500">
                    <p className="text-xl font-bold px-2 py-3.5 border-b">
                      Tấn công
                    </p>
                    {Object.entries(attack).map(([key, value], index) => (
                      <div
                        key={index}
                        className=" border-b-slate-200 flex justify-between px-2 py-2.5"
                      >
                        <span className="text-md font-light">{key}</span>
                        <span className="text-md font-bold">
                          {" "}
                          {typeof value === "number"
                            ? value.toLocaleString("en-US")
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2 text-primary">
                  <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-green-500 text-primary">
                    <p className="text-xl font-bold px-2 py-3.5 border-b">
                      Phối hợp
                    </p>
                    {Object.entries(teamPlay).map(([key, value], index) => (
                      <div
                        key={index}
                        className="border-b-slate-200 flex justify-between px-2 py-2.5"
                      >
                        <span className="text-md font-light">{key}</span>
                        <span className="text-md font-bold">
                          {typeof value === "number"
                            ? value.toLocaleString("en-US")
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-green-500 text-primary">
                    <p className="text-xl font-bold px-2 py-3.5 border-b">
                      Phòng thủ
                    </p>
                    {Object.entries(defence).map(([key, value], index) => (
                      <div
                        key={index}
                        className="border-b-slate-200 flex justify-between px-2 py-2.5"
                      >
                        <span className="text-md font-light">{key}</span>
                        <span className="text-md font-bold">
                          {typeof value === "number"
                            ? value.toLocaleString("en-US")
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-primary">
                  <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-green-500 text-primary">
                    <p className="text-xl font-bold px-2 py-3.5 border-b">
                      Phạm lỗi
                    </p>
                    {Object.entries(discipline).map(([key, value], index) => (
                      <div
                        key={index}
                        className="border-b-slate-200 flex justify-between px-2 py-2.5"
                      >
                        <span className="text-md font-light">{key}</span>
                        <span className="text-md font-bold">
                          {typeof value === "number"
                            ? value.toLocaleString("en-US")
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Form
          initialValues={{
            nationality: player?.nationality,
            name: player?.name,
          }}
          form={form}
          name="basic"
          layout="vertical"
        >
          <Row gutter={[24, 14]}>
            <Col span={6}>
              <div className="w-[200px] h-[200px] rounded-md overflow-hidden">
                <img
                  src={player?.imageURL}
                  alt="playerAvt"
                  className="object-cover"
                />
              </div>
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
            </Col>
          </Row>
        </Form> */}
      </Card>
    </div>
  );
}
