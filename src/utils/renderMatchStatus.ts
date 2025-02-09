export function renderMatchStatus(status: string) {
  switch (status) {
    case "SCHEDULED":
      return "Đã lên lịch";
    case "ONGOING":
      return "Đang diễn ra";
    case "COMPLETED":
      return "Đã thi đấu";
  }
}
