import { Button, Table, TableProps, Avatar } from "antd";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { queryKeys } from "@/api/queryKeys";
import fetcher from "@/api/fetcher";
import { ILineup } from "@/type/lineup";
import { IMatch } from "@/type/match";
import { renderPositionText } from "@/utils/renderPositionText";
import { PlusOutlined } from "@ant-design/icons";
import MatchLineupsCreate from "./MatchLineupsCreate";

export default function MatchLineups() {
  const { matchId } = useParams();
  const [isOpenMatchLineupsCreate, setIsOpenMatchLineupsCreate] =
    useState<boolean>(false);
  const [lineups, setLineups] = useState<ILineup[]>([]);

  const { data, refetch, isLoading } = useQuery<{
    match: IMatch;
    homeClubLineups: ILineup[];
    awayClubLineups: ILineup[];
  }>({
    queryKey: [queryKeys.GET_MATCH_LINEUPS, matchId],
    queryFn: async () =>
      fetcher(`matches/${matchId}/lineups`).then((res) => {
        return res.data;
      }),
    enabled: !!matchId,
  });

  const handleCloseMatchLineupsCreate = () => {
    setIsOpenMatchLineupsCreate(false);
    refetch();
  };

  const handleOpenModal = (lineupsData: ILineup[] | undefined) => {
    if (lineupsData) {
      setLineups(lineupsData);
      setIsOpenMatchLineupsCreate(true);
    }
  };

  const columns: TableProps<ILineup>["columns"] = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <>
          <Avatar
            className="mr-2"
            shape="square"
            size="large"
            src={record.player.imageURL}
          />
          <Link to={`/players/${record.id}`}>{record.player.name}</Link>
        </>
      ),
    },
    {
      title: "Số áo",
      dataIndex: "shirtNumber",
      key: "shirtNumber",
      render: (_, record) => <span>{record.player.shirtNumber}</span>,
    },
    {
      title: "Vị trí thi đấu",
      dataIndex: "position",
      key: "position",
      render: (_, record) => (
        <span>{renderPositionText(record.player.position)}</span>
      ),
    },
  ];

  if (isLoading) return <p>Đang tải...</p>;

  return (
    <div className="grid grid-cols-2 gap-6">
      {data && (
        <>
          {/* Home Club */}
          <div>
            <h2 className="text-xl font-bold mt-3 mb-2 flex justify-between">
              {data?.match?.homeClub?.name}
              <Button onClick={() => handleOpenModal(data?.homeClubLineups)}>
                <PlusOutlined />
              </Button>
            </h2>
            <Table<ILineup>
              columns={columns}
              dataSource={
                data?.homeClubLineups?.filter((lineup) => lineup.isStarting) ||
                []
              }
              rowKey="id"
            />
          </div>

          {/* Away Club */}
          <div>
            <h2 className="text-xl font-bold mt-3 mb-2 flex justify-between">
              {data?.match?.awayClub?.name}
              <Button onClick={() => handleOpenModal(data?.awayClubLineups)}>
                <PlusOutlined />
              </Button>
            </h2>
            <Table<ILineup>
              columns={columns}
              dataSource={
                data?.awayClubLineups?.filter((lineup) => lineup.isStarting) ||
                []
              }
              rowKey="id"
            />
          </div>

          {/* Modal */}
          <MatchLineupsCreate
            open={isOpenMatchLineupsCreate}
            onCancel={handleCloseMatchLineupsCreate}
            lineups={lineups}
            setLineups={setLineups}
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
}
