import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUserData } from "./login";

//create user
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { id },
    } = req;

    //delete user from db
    const data = fs.readFileSync("./db/data.json", "utf8");
    const users: IUserData[] = JSON.parse(data);
    const filteredUsers = users.filter((user) => user.id !== id);
    fs.writeFileSync("./db/data.json", JSON.stringify(filteredUsers));

    return res.status(202).json({
      status: 202,
      message: "Usuario eliminado con éxito",
      data: null,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Error al eliminar usuario",
      data: null,
    });
  }
}
