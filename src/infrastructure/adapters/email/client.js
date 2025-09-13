import {Resend} from "resend";

export const connectEmail = async (apiKey) => {
  return new Resend(apiKey);
};
