import fetcher from "@/api/fetcher";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useParams } from "react-router-dom";

export default function MatchImages() {
  const { matchId } = useParams();
  const { data, refetch } = useQuery({
    queryKey: ["GET_MATCH_IMAGES"],
    queryFn: () =>
      fetcher.get(`matches/${matchId}/images`).then((res) => res.data),
  });
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);
    if (matchId && newFileList) {
      const body = new FormData();
      body.append("matchId", matchId);
      body.append("image", newFileList[0].originFileObj as File);
      fetcher.post(`matches/${matchId}/images`, body).then((res) => {
        console.log(res);
        refetch();
      });
    }
  };

  return (
    <div>
      <hr className="mt-6 mb-4" />
      <h2 className="text-xl font-bold">Hình ảnh trận đấu</h2>
      <div className="grid grid-cols-4 flex-col gap-4 mt-4">
        <ImgCrop rotationSlider>
          <Upload listType="picture-card" fileList={[]} onChange={onChange}>
            <UploadOutlined className="text-3xl" />
          </Upload>
        </ImgCrop>
        {data &&
          data.map((matchImage: any, index: any) => (
            <div
              className="rounded-lg overflow-hidden w-full h-[200px] border"
              key={index}
            >
              <img
                src={matchImage?.imageURL}
                className="object-cover h-full w-full"
                key={index}
              ></img>
            </div>
          ))}
      </div>
    </div>
  );
}
