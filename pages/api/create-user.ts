import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUserData } from "./login";

//create user
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { email, password },
    } = req;

    //add user to db
    const data = fs.readFileSync("./db/data.json", "utf8");
    const users: IUserData[] = JSON.parse(data);
    const id = users[users.length - 1].id + 1;
    const newUser = { id, email, password };
    users.push(newUser);
    fs.writeFileSync("./db/data.json", JSON.stringify(users));

    return res.status(202).json({
      status: 202,
      message: "Usuario creado con éxito",
      data: { id, email, password },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Error al crear usuario",
      data: null,
    });
  }
}
