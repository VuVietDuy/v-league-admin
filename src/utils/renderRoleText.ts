export function renderRoleText(role: any) {
  switch (role) {
    case "ADMIN":
      return "Quản trị viên";
    case "USER":
      return "Người dùng";
    default:
      return "Không xác định";
  }
}
