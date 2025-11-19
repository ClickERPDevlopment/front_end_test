import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <p className="text-sm text-red-500 mb-4">{message}</p>
);

export default ErrorMessage;
