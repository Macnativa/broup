import { VercelRequest, VercelResponse } from "@vercel/node";
import { createServer } from "http";
import { app } from "../server/_core/index";

let server: any;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = createServer(app);
  }

  return new Promise((resolve) => {
    server(req, res, () => {
      resolve(undefined);
    });
  });
}

