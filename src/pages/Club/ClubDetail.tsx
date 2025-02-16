import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Input,
  Row,
  Space,
  Spin,
  Table,
  TableProps,
} from "antd";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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

  const { data: clubStats, isLoading } = useQuery({
    queryKey: ["GET_CLUB_STATS"],
    queryFn: () =>
      fetcher
        .get(`tournaments/vleague-1/clubs/${clubId}/stats`)
        .then((res) => res.data),
  });
  const { data: seasonsData, isLoading: isLoadingSeasonsData } = useQuery({
    queryKey: ["GET_LISTS_SEASON_FOR_RESULTS_PAGE"],
    queryFn: () =>
      fetcher.get(`tournaments/vleague-1/seasons`).then((res) => res.data),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const seasonId = searchParams.get("seasonId");
  console.log(club);
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

  const teamPlay = {
    "Số đường chuyền": clubStats?.teamPlay?.passes,
    "Đường chuyền mỗi trận": clubStats?.teamPlay?.passesPerMatch,
    "Chuyền chính xác": clubStats?.teamPlay?.passAccuracy,
    "Số lần tạt bóng": clubStats?.teamPlay?.crosses,
    "Tạt bóng chính xác": clubStats?.teamPlay?.crossesAccuracy,
  };
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
                    <Input disabled value={club?.name} />
                  </Form.Item>

                  <Form.Item label="Tên viết tắt" name="shortName">
                    <Input disabled value={club?.shortName} />
                  </Form.Item>

                  <Form.Item label="Năm Thành Lập" name="foundedYear">
                    <Input disabled value={club?.foundedYear} />
                  </Form.Item>

                  <Form.Item label="Huấn luyện viên" name="coach">
                    <Input disabled value={club?.coach} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="m-6">
            <h1 className="text-2xl mb-2">Sân vận động</h1>
            <Form initialValues={club} layout="vertical">
              <Row gutter={[24, 14]}>
                <Col span={12}>
                  <Form.Item label="Tên sân vận động" name="stadium">
                    <Input disabled value={club?.statium} />
                  </Form.Item>
                </Col>
                {club?.stadiumCapacity && (
                  <Col span={12}>
                    <Form.Item label="Sức chứa" name="stadiumCapacity">
                      <Input disabled value={club?.stadiumCapacity} />
                    </Form.Item>
                  </Col>
                )}
              </Row>
              {club?.stadiumDescription && (
                <Col span={24}>
                  <Form.Item label="Mô tả SVĐ" name="stadiumDescription">
                    <Input disabled value={club?.stadiumDescription} />
                  </Form.Item>
                </Col>
              )}

              <Row gutter={[24, 14]}>
                {club?.stadiumAddress && (
                  <Col span={12}>
                    <Form.Item label="Địa chỉ" name="stadiumAddress">
                      <Input disabled value={club?.stadiumAddress} />
                    </Form.Item>
                  </Col>
                )}
                {club?.stadiumMap && (
                  <Col span={12}>
                    <Form.Item label="Map" name="stadiumCapacity">
                      <Input disabled value={club?.stadiumMap} />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>

          <Card className="m-6">
            <h1 className="text-2xl mb-2">Thống kê câu lạc bộ</h1>
            <div className="flex justify-between border rounded-sm">
              <Dropdown
                menu={{
                  items: isLoadingSeasonsData
                    ? []
                    : seasonsData.map((season: any, index: number) => ({
                        key: index,
                        label: (
                          <a
                            className="hover:text-purple-800 text-wrap w-28"
                            href={`?seasonId=${season.id}`}
                          >
                            {season.name.split(" ").slice(-1)[0]}
                          </a>
                        ),
                      })),
                }}
              >
                <div
                  className="w-fit px-3 py-2 flex gap-8 border-r"
                  onClick={(e) => e.preventDefault()}
                >
                  <div>
                    <p className="text-[10px]">Lọc theo mùa giải</p>
                    <p>
                      {seasonId === null || (isLoadingSeasonsData && <Spin />)}
                      {seasonId !== null && !isLoadingSeasonsData
                        ? seasonsData
                            .filter((season: any) => season.id === +seasonId)[0]
                            .name.split(" ")
                            .slice(-1)[0]
                        : !isLoadingSeasonsData &&
                          seasonsData
                            .filter((season: any) => season.isActive)[0]
                            .name.split(" ")
                            .slice(-1)[0]}
                    </p>
                  </div>
                  <DownOutlined className="text-xs" />
                </div>
              </Dropdown>

              <Link
                className="px-3 flex items-center gap-2 hover:text-purple-900"
                to=""
              >
                <ReloadOutlined /> Xóa bộ lọc
              </Link>
            </div>

            <div className="grid sm:grid-cols-12 grid-cols-10 gap-3 mt-6">
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Số trận thi đấu
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.matchesPlayed.toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Số trận thắng
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.wins.toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Số trận thua
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.losses.toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Bàn thắng
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.goals.toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Bàn thua
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.goalsConceded.toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-4 col-span-5 sm:col-span-4 lg:col-span-2 rounded-md bg-[#fffffd] border">
                <p className="text-md font-light mb-3.5 text-primary">
                  Số trận sạch lưới
                </p>
                <p className="md:text-5xl text-4xl font-bold text-primary">
                  {clubStats.cleanSheets.toLocaleString("en-US")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2.5 mt-6">
              <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1  text-primary">
                <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-red-500">
                  <p className="text-xl font-bold px-2 py-3.5 border-b">
                    Tấn công
                  </p>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Bàn thắng</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.goals === "number"
                        ? clubStats.attack.goals.toLocaleString("en-US")
                        : clubStats.attack.goals}
                    </span>
                  </div>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Bàn thắng mỗi trận
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.goalsPerMatch === "number"
                        ? clubStats.attack.goalsPerMatch.toLocaleString("en-US")
                        : clubStats.attack.goalsPerMatch}
                    </span>
                  </div>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Số lần dứt điểm</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.shots === "number"
                        ? clubStats.attack.shots.toLocaleString("en-US")
                        : clubStats.attack.shots}
                    </span>
                  </div>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Dứt điểm trúng đích
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.shotsOnTarget === "number"
                        ? clubStats.attack.shotsOnTarget.toLocaleString("en-US")
                        : clubStats.attack.shotsOnTarget}
                    </span>
                  </div>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Dứt điểm chính xác %
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.shootingAccuracy === "number"
                        ? clubStats.attack.shootingAccuracy.toLocaleString(
                            "en-US"
                          )
                        : clubStats.attack.shootingAccuracy}{" "}
                      %
                    </span>
                  </div>
                  <div className=" border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Cơ hội tạo ra</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.attack.keyPass === "number"
                        ? clubStats.attack.keyPass.toLocaleString("en-US")
                        : clubStats.attack.keyPass}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1">
                <div className="rounded-md border  border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-red-500 text-primary">
                  <p className="text-xl font-bold px-2 py-3.5 border-b">
                    Phòng thủ
                  </p>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Số trận sạch lưới
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.cleanSheets === "number"
                        ? clubStats.defence.cleanSheets.toLocaleString("en-US")
                        : clubStats.defence.cleanSheets}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Số bàn thua</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.goalsConceded === "number"
                        ? clubStats.defence.goalsConceded.toLocaleString(
                            "en-US"
                          )
                        : clubStats.defence.goalsConceded}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Bàn thua mỗi trận
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.goalsConcededPermatch ===
                      "number"
                        ? clubStats.defence.goalsConcededPermatch.toLocaleString(
                            "en-US"
                          )
                        : clubStats.defence.goalsConcededPermatch}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Cứu thua</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.saves === "number"
                        ? clubStats.defence.saves.toLocaleString("en-US")
                        : clubStats.defence.saves}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Phản lưới</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.ownGoals === "number"
                        ? clubStats.defence.ownGoals.toLocaleString("en-US")
                        : clubStats.defence.ownGoals}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">
                      Phạm lỗi dẫn đến bàn thua
                    </span>
                    <span className="text-md font-bold">
                      {typeof clubStats.defence.ownGoals === "number"
                        ? clubStats.defence.ownGoals.toLocaleString("en-US")
                        : clubStats.defence.ownGoals}
                    </span>
                  </div>
                </div>
              </div>

              <div className=" col-span-4 sm:col-span-2  md:col-span-2 lg:col-span-1">
                <div className="rounded-md border border-x-slate-100 bg-[#fffffd] border-b-slate-100 border-t-4 border-t-red-500 text-primary">
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

              <div className="col-span-4 sm:col-span-2  md:col-span-2 lg:col-span-1">
                <div className="rounded-md border  border-x-slate-100 h-fit bg-[#fffffd] border-b-slate-100 border-t-4 border-t-red-500 text-primary">
                  <p className="text-xl font-bold px-2 py-3.5 border-b">
                    Phạm lỗi
                  </p>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Thẻ vàng</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.discipline.yellowCard === "number"
                        ? clubStats.discipline.yellowCard.toLocaleString(
                            "en-US"
                          )
                        : clubStats.discipline.yellowCard}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Thẻ đỏ</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.discipline.redCard === "number"
                        ? clubStats.discipline.redCard.toLocaleString("en-US")
                        : clubStats.discipline.redCard}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Phạm lỗi</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.discipline.fouls === "number"
                        ? clubStats.discipline.fouls.toLocaleString("en-US")
                        : clubStats.discipline.fouls}
                    </span>
                  </div>
                  <div className="border-b-slate-200 flex justify-between px-2 py-2.5">
                    <span className="text-md font-light">Việt vị</span>
                    <span className="text-md font-bold">
                      {typeof clubStats.discipline.offsides === "number"
                        ? clubStats.discipline.offsides.toLocaleString("en-US")
                        : clubStats.discipline.offsides}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
