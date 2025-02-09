import fetcher from "@/api/fetcher";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadFile } from "antd/lib";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewsForm() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log(values);
    const data = new FormData();
    data.append("title", values.title);
    data.append("tag", values.tag);
    data.append("content", values.content);
    data.append("publishedAt", "2025-2-7");
    if (fileList.length > 0) {
      data.append("thumbnailFile", fileList[0].originFileObj as File);
    }
    fetcher
      .post("/news", data)
      .then((res) => {
        message.success("Tạo tin tức thành công");
        navigate("/news");
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
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          tag: "",
          content: "",
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
                onEditorChange={(content) => setFieldValue("content", content)}
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
              <Button>Lưu bản nháp</Button>
              <Button htmlType="submit" type="primary">
                Xuất bản
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
