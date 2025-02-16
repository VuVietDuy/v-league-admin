import fetcher from "@/api/fetcher";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} Tháng ${month}, ${year}`;
};

export default function NewsDetail() {
  const { newsId } = useParams();
  const { data: news, isLoading } = useQuery({
    queryKey: ["GET_NEWS_DETAIL"],
    queryFn: () => fetcher.get(`news/${newsId}`).then((res) => res.data),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-20">
      <header
        className={`relative mb-6 md:mb-8 min-h-[120px] md:min-h-[195px] w-full`}
      >
        <div className="relative min-h-[120px] md:min-h-[195px] w-full overflow-hidden"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 ">
          <div className="max-w-[888px] m-auto h-full py-5 flex flex-col justify-center">
            <span className=" text-lg font-bold mb-2">Tin tức</span>
            <h1 className="md:text-4xl  font-semibold mb-2">{news.title}</h1>
            <span className=" text-xl">{formatDate(news.publishedAt)}</span>
          </div>
        </div>
      </header>
      <div className="max-w-[888px] m-auto">
        <img
          src={news.thumbnail}
          className="aspect-[16/9] w-full mb-2"
          alt=""
        />
        <h2>{news.description}</h2>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>
    </div>
  );
}
