'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log();

    const coveredLineDecoration = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'red',
		borderWidth: '1px',
		borderStyle: 'solid',
		overviewRulerColor: 'blue',
		overviewRulerLane: vscode.OverviewRulerLane.Right,
		light: {
			// this color will be used in light color themes
			borderColor: 'darkblue'
		},
		dark: {
			// this color will be used in dark color themes
			borderColor: 'lightblue'
        },
        
    });

    

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        const linesToHighlight: vscode.DecorationOptions[] = [];

        let activeEditor = vscode.window.activeTextEditor;

        if(activeEditor){

            console.log('active editor')

            for (var i = 0; i < activeEditor.document.lineCount; i++){
                if(i % 2){

                    const startPos = new vscode.Position(i, 0);
                    const endPos = new vscode.Position(i+1, 0);
                    linesToHighlight.push(
                        { range: new vscode.Range(startPos, endPos), hoverMessage: 'odd line'}
                    );
                }
            }

            activeEditor.setDecorations(coveredLineDecoration, linesToHighlight);
        }

        if(!vscode.workspace.rootPath){
            vscode.window.showInformationMessage('You need to open the folder with your Python project.');
        }else{
            console.log(vscode.workspace.rootPath);
        }

        // Display a message box to the user
        //console.log(activeEditor)
        vscode.window.showInformationMessage('Hello World!');
    });


    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}