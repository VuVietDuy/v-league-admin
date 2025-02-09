export function renderEventTypeText(eventType: string) {
  switch (eventType) {
    case "START":
      return "Bắt đầu trận đấu";
    case "GOAL":
      return "Bàn thắng";
    case "YELLOW_CARD":
      return "Thẻ vàng";
    case "RED_CARD":
      return "Thẻ đỏ";
    case "SUBSTITUTION":
      return "Thay người";
    case "OWN_GOAL":
      return "Phản lưới nhà";
    case "SHOTS":
      return "Dứt điểm";
    case "SHOTS_ON_TARGET":
      return "Dứt điểm trúng đích";
    case "BIG_CHANCES_CREATED":
      return "Cơ hội lớn";
    case "KEY_PASSES":
      return "";
    case "SUCCESSFUL_DRIBBLES":
      return "";
    case "SAVE":
      return "Cứu thua";
    case "FINISH":
      return "Kết thúc trận đấu";
  }
}
