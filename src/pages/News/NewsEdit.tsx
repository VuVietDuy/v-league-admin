import fetcher from "@/api/fetcher";
import Loading from "@/components/Loading";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Card, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadFile } from "antd/lib";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function NewsEdit() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { data: news, isLoading } = useQuery({
    queryKey: ["GET_NEWS_DETAIL"],
    queryFn: () => fetcher.get(`news/${newsId}`).then((res) => res.data),
  });

  const handleSubmit = (values: any) => {
    fetcher
      .put(`/news/${newsId}`, values)
      .then((res) => {
        message.success("Chỉnh sửa tin tức thành công");
        // navigate("/news");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xảy ra lỗi");
      });
  };

  const handleChangeThumnail = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (news?.thumbnail) {
      setFileList([
        {
          uid: "-1",
          name: "thumbnail.png",
          status: "done",
          url: news.thumbnail, // Đường dẫn ảnh từ dữ liệu `news`
        },
      ]);
    }
  }, [news]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="m-6">
      <div>
        <Formik
          initialValues={{
            title: news.title,
            tag: news.tag,
            content: news.content,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="">Tiêu đề</label>
                <TextArea
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">Hình ảnh</label>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChangeThumnail}
                  beforeUpload={() => false}
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </div>
              <div className="mb-2">
                <label htmlFor="">Tag</label>
                <Input name="tag" value={values.tag} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Nội dung</label>
                <Editor
                  onEditorChange={(content) =>
                    setFieldValue("content", content)
                  }
                  textareaName="content"
                  apiKey={"t2pqf0u5yvinox5op4ih9bjolkd7vpvtsy0a0ntg4o9avodz"}
                  // onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue={values.content}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                    ],
                    // statusbar: false,
                    branding: false,
                    elementpath: false,
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button>Hủy</Button>
                <Button htmlType="submit" type="primary">
                  Xuất bản
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Card>
  );
}
