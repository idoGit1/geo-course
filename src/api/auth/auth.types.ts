export interface User {
  username: string;
  email: string;
  role: UserRole;
}

interface UserRole {
  name: UserRoleName;
}

type UserRoleName = "Authenticated" | "Admin";
