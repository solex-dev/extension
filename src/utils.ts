import * as fs from "fs";
import { homedir } from "os";
import * as path from "path";

const searchFile: any = (directory: string, fileName: string) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    try {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const foundFile = searchFile(filePath, fileName);
        if (foundFile) {
          return foundFile;
        }
      } else if (file === fileName) {
        return filePath;
      }
    } catch (err) {}
  }

  return null; // File not found
};

// const filePath = searchFile(homedir(), "solex.toml");

// if (filePath) {
//   console.log(`File found at: ${filePath}`);
// } else {
//   console.log(`File not found.`);
// }

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
