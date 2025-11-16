interface ILogin {
  email: string;
  password: string;
}

interface ILogout {
  userId: string;
}

export type { ILogin, ILogout };
