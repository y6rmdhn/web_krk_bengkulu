interface IRole {
  id?: string;
  name: string;
  is_active: boolean;
}

interface IUserRoles {
  id?: string;
  userId: string;
  roleId: string;
}

export { IRole, IUserRoles };
