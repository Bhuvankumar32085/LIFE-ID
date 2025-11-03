// copy-prisma-engines.js
import fs from "fs";
import path from "path";

const source = path.join(
  process.cwd(),
  "node_modules",
  ".prisma",
  "client"
);
const destination = path.join(
  process.cwd(),
  "node_modules",
  "@prisma",
  "client"
);

if (fs.existsSync(source)) {
  console.log("Copying Prisma engines for Vercel...");
  fs.mkdirSync(destination, { recursive: true });

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    if (file.includes("engine") || file.includes(".so.node")) {
      fs.copyFileSync(
        path.join(source, file),
        path.join(destination, file)
      );
    }
  });
  console.log("✅ Prisma engines copied successfully!");
} else {
  console.log("⚠️ No Prisma engine directory found!");
}
