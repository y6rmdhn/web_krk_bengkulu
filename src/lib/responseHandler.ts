import session from "@/utils/session";
import { AxiosError } from "axios";

interface ErrorResponseData {
  data: {
    name: string;
  };
}

const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;

  if (response && res?.data?.name === "TokenExpiredError") {
    session.clearSession();
  }
};

export { onErrorHandler };
