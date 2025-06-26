interface IError {
  message?: string;
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

export const errorCatch = (error: IError) => {
  const message = error?.response?.data?.message;

  if (message) {
    return typeof message === "string" ? message : message[0];
  }

  return error.message || "Неизвестная ошибка";
};
