import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="container mx-auto px-10 pb-10 flex justify-center">
      <Spin />
    </div>
  );
}
