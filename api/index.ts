import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Serve index.html for all requests (SPA routing)
  const indexPath = path.join(process.cwd(), "dist/public/index.html");
  
  try {
    const html = fs.readFileSync(indexPath, "utf-8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: "Failed to load index.html" });
  }
}

