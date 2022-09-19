import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export interface IUserData {
  id: number;
  email: string;
  password: string;
}

export interface IResponseData {
  status: number;
  message: string;
  data?: IUserData;
}

//get user by email and password
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  const {
    body: { email, password },
  } = req;

  const data = fs.readFileSync("./db/data.json", "utf8");
  const users: IUserData[] = JSON.parse(data);

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }

  return res.status(202).json({
    status: 202,
    message: "Bienvenido de nuevo",
    data: user,
  });
}
