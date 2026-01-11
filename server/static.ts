import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Cache index.html content for faster response
  const indexPath = path.resolve(distPath, "index.html");
  const indexHtml = fs.readFileSync(indexPath, "utf-8");

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // Use cached content for faster health check response
  app.use("*", (_req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(indexHtml);
  });
}
