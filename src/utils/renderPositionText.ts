export function renderPositionText(position: any) {
  switch (position) {
    case "DEFENDER":
      return "Hậu vệ";
    case "GOALKEEPER":
      return "Thủ môn";
    case "MIDFIELDER":
      return "Tiền vệ";
    case "FORWARD":
      return "Tiền đạo";
  }
}
