export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("vi-VN", options).format(date);

  const [weekday] = formattedDate.split(",");
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${weekday} ${day} Tháng ${month}, ${year}`;
};
