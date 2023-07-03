import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { HomePanel } from "./HomePanel";
import { SidebarProvider } from "./SidebarProvider";

export async function activate(context: vscode.ExtensionContext) {
  const specificFile = "solex.json";

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("solex-sidebar", sidebarProvider),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("solex.getExercises", () => {
      const filePath = context.globalState.get("solex");
      if (filePath) {
        const file = fs.readFileSync(filePath as string, "utf8");
        const json = JSON.parse(file);
        sidebarProvider._view?.webview.postMessage({
          command: "getExercises",
          data: {
            exercises: json.exercises,
          },
        });
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("solex.openExercise", async (id) => {
      const filePath = context.globalState.get("solex");
      if (filePath) {
        const file = fs.readFileSync(filePath as string, "utf8");
        const json = JSON.parse(file);
        const exercise = json.exercises.find((e: any) => e.id === id);
        if (exercise) {
          // open the file in editor
          const uri = vscode.Uri.file(
            path.join(
              vscode.workspace.workspaceFolders![0].uri.fsPath,
              "programs",
              exercise.id,
              "src/lib.rs",
            ),
          );
          try {
            const doc = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(doc);
          } catch (error: any) {
            vscode.window.showErrorMessage(
              `Cannot open ${exercise.name} exercise :/`,
            );
          }
        }
      }
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

            context.globalState.update("solex", filePath);

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
