import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { HomePanel } from "./HomePanel";
import { SidebarProvider } from "./SidebarProvider";

export async function activate(context: vscode.ExtensionContext) {
  const specificFile = "solex.toml";

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("solex-sidebar", sidebarProvider),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("solex.openExercise", () => {
      vscode.window.showInformationMessage("opened exercise");
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("solex.refresh", () => {
      HomePanel.kill();
      HomePanel.createOrShow(context.extensionUri);
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("solex.checkIfInSolex", () => {
      if (vscode.workspace.workspaceFolders) {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        for (const folder of workspaceFolders) {
          const filePath = path.join(folder.uri.fsPath, specificFile);
          if (fs.existsSync(filePath)) {
            console.log("is in solex");

            setTimeout(() => {
              sidebarProvider._view?.webview.postMessage({
                command: "isInSolex",
                data: {
                  isInSolex: true,
                },
              });
            }, 500);
            break;
          }
        }
      }
    }),
  );

  await vscode.commands.executeCommand("solex.checkIfInSolex");
}

export function deactivate() {}
