export function renderGenderText(gender: any) {
  switch (gender) {
    case "FEMALE":
      return "Nữ";
    case "MALE":
      return "Nam";
    default:
      return "Khác";
  }
}
