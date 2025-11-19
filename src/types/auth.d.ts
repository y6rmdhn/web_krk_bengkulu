interface ILogin {
  email: string;
  password: string;
}

interface IResgister {
  nik: string;
  phone: string;
  password: string;
  email: string;
  name: string;
  confirmPassword?: string;
}

interface ILogout {
  userId: string;
}

interface IVerifyEmail {
  email: string;
}

export type { ILogin, ILogout, IResgister, IVerifyEmail };
