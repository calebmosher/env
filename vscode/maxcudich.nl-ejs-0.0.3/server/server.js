/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
const vscode_languageserver_1 = require("vscode-languageserver");
const { lint } = require('./linter');
// Create a connection for the server. The connection uses Node's IPC as a transport
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
// Create a simple text document manager. The text document manager
// supports full document sync only
let documents = new vscode_languageserver_1.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities.
let workspaceRoot;
connection.onInitialize((params) => {
    workspaceRoot = params.rootPath;
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
    let settings = change.settings;
    // Revalidate any open text documents
    documents.all().forEach(validateTextDocument);
});
function validateTextDocument(textDocument) {
    const diagnostics = [];
    const text = textDocument.getText();
    const err = lint(text);
    if (err) {
        const { line, column, message, annotated, startPos, endPos } = err;
        diagnostics.push({
            severity: vscode_languageserver_1.DiagnosticSeverity.Error,
            range: {
                start: { line, character: startPos },
                end: { line, character: endPos }
            },
            message: annotated,
            source: 'nl-ejs'
        });
    }
    // Send the computed diagnostics to VSCode.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
connection.onDidChangeWatchedFiles((change) => {
    // Monitored files have change in VSCode
    connection.console.log('We received a file change event');
});
// This handler provides the initial list of the completion items.
connection.onCompletion((textDocumentPosition) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        {
            label: 'addNbspToStr',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 1,
            documentation: ''
        },
        {
            label: 'alternateLangLinks',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 2,
            documentation: ''
        },
        {
            label: 'altShadowHandraiser',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 3,
            documentation: ''
        },
        {
            label: 'authorImage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 4,
            documentation: ''
        },
        {
            label: 'authorKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 5,
            documentation: ''
        },
        {
            label: 'authorShortBio',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 6,
            documentation: ''
        },
        {
            label: 'authorUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 7,
            documentation: ''
        },
        {
            label: 'blogImageSrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 8,
            documentation: ''
        },
        {
            label: 'blogMetadata',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 9,
            documentation: ''
        },
        {
            label: 'blogPostBlock',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 10,
            documentation: ''
        },
        {
            label: 'bodyId',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 11,
            documentation: ''
        },
        {
            label: 'buyUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 12,
            documentation: ''
        },
        {
            label: 'canonicalUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 13,
            documentation: ''
        },
        {
            label: 'cdnUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 14,
            documentation: ''
        },
        {
            label: 'celsiusSrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 15,
            documentation: ''
        },
        {
            label: 'cleanDescription',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 16,
            documentation: ''
        },
        {
            label: 'countryCode',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 17,
            documentation: ''
        },
        {
            label: 'currency',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 18,
            documentation: ''
        },
        {
            label: 'currentSeason',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 19,
            documentation: ''
        },
        {
            label: 'dasherize',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 20,
            documentation: ''
        },
        {
            label: 'downloadUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 21,
            documentation: ''
        },
        {
            label: 'facebookLink',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 22,
            documentation: ''
        },
        {
            label: 'fontPath',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 23,
            documentation: ''
        },
        {
            label: 'geoipClasses',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 24,
            documentation: ''
        },
        {
            label: 'geoipJson',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 25,
            documentation: ''
        },
        {
            label: 'getLocaleRoot',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 26,
            documentation: ''
        },
        {
            label: 'getLocalizedAlternates',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 27,
            documentation: ''
        },
        {
            label: 'handleFallback',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 28,
            documentation: ''
        },
        {
            label: 'handraiser',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 29,
            documentation: ''
        },
        {
            label: 'host',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 30,
            documentation: ''
        },
        {
            label: 'hostDomain',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 31,
            documentation: ''
        },
        {
            label: 'hostUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 32,
            documentation: ''
        },
        {
            label: 'htmlFor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 33,
            documentation: ''
        },
        {
            label: 'htmlTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 34,
            documentation: ''
        },
        {
            label: 'htmlWrapLoc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 35,
            documentation: ''
        },
        {
            label: 'ietfLanguageTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 36,
            documentation: ''
        },
        {
            label: 'imagePath',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 37,
            documentation: ''
        },
        {
            label: 'imageTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 38,
            documentation: ''
        },
        {
            label: 'isAvailable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 39,
            documentation: ''
        },
        {
            label: 'isBlogArticle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 40,
            documentation: ''
        },
        {
            label: 'isCelsius',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 41,
            documentation: ''
        },
        {
            label: 'isFahrenheit',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 42,
            documentation: ''
        },
        {
            label: 'isLanguage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 43,
            documentation: ''
        },
        {
            label: 'isLocale',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 44,
            documentation: ''
        },
        {
            label: 'isRegion',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 45,
            documentation: ''
        },
        {
            label: 'isUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 46,
            documentation: ''
        },
        {
            label: 'javascriptIncludeTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 47,
            documentation: ''
        },
        {
            label: 'linkTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 48,
            documentation: ''
        },
        {
            label: 'localeSrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 49,
            documentation: ''
        },
        {
            label: 'localizedSearchStrings',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 50,
            documentation: ''
        },
        {
            label: 'locDatetime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 51,
            documentation: ''
        },
        {
            label: 'metaPageTitle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 52,
            documentation: ''
        },
        {
            label: 'metaTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 53,
            documentation: ''
        },
        {
            label: 'microdata',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 54,
            documentation: ''
        },
        {
            label: 'microdataType',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 55,
            documentation: ''
        },
        {
            label: 'modifySrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 56,
            documentation: ''
        },
        {
            label: 'navActive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 57,
            documentation: ''
        },
        {
            label: 'nginxSsi',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 58,
            documentation: ''
        },
        {
            label: 'nginxSsiKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 59,
            documentation: ''
        },
        {
            label: 'nginxSsiValue',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 60,
            documentation: ''
        },
        {
            label: 'nurl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 61,
            documentation: ''
        },
        {
            label: 'openGraphMetadata',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 62,
            documentation: ''
        },
        {
            label: 'openGraphPrefix',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 63,
            documentation: ''
        },
        {
            label: 'openGraphType',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 64,
            documentation: ''
        },
        {
            label: 'pageAuthor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 65,
            documentation: ''
        },
        {
            label: 'pageDescription',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 66,
            documentation: ''
        },
        {
            label: 'pageLanguage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 67,
            documentation: ''
        },
        {
            label: 'pageTitle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 68,
            documentation: ''
        },
        {
            label: 'partialLoc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 69,
            documentation: ''
        },
        {
            label: 'productSchemaHelper',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 70,
            documentation: ''
        },
        {
            label: 'resizedSrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 71,
            documentation: ''
        },
        {
            label: 'retinaSrc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 72,
            documentation: ''
        },
        {
            label: 'seasonalTemp',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 73,
            documentation: ''
        },
        {
            label: 'sectionClasses',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 74,
            documentation: ''
        },
        {
            label: 'shouldBlockZoom',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 75,
            documentation: ''
        },
        {
            label: 'shouldNotTranslate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 76,
            documentation: ''
        },
        {
            label: 'socialImageUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 77,
            documentation: ''
        },
        {
            label: 'socialUrl',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 78,
            documentation: ''
        },
        {
            label: 'ssiVar',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 79,
            documentation: ''
        },
        {
            label: 'stripTags',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 80,
            documentation: ''
        },
        {
            label: 'stylesheetLinkTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 81,
            documentation: ''
        },
        {
            label: 'summary',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 82,
            documentation: ''
        },
        {
            label: 't',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 83,
            documentation: ''
        },
        {
            label: 'target',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 84,
            documentation: ''
        },
        {
            label: 'tempScale',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 85,
            documentation: ''
        },
        {
            label: 'twitterCardMetadata',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 86,
            documentation: ''
        },
        {
            label: 'twitterLink',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 87,
            documentation: ''
        },
        {
            label: 'underscoreLanguageTag',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 88,
            documentation: ''
        },
        {
            label: 'partial',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 89,
            documentation: 'Include a partial within a template, partial, or layout'
        }
    ];
});
// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    const { data } = item;
    // switch (data) {
    // 	case 1:
    // 		item.detail = 'TypeScript details',
    // 		item.documentation = 'TypeScript documentation'
    // 		break;
    // 	case 2:
    // 		item.detail = 'JavaScript details',
    // 		item.documentation = 'JavaScript documentation'
    // 		break;
    // 	case 3:
    // 		item.detail = 'asfdasfdsd',
    // 		item.documentation = 'afdsfafsdn'
    // 		break;
    // 	default:
    // }
    return item;
});
let t;
// connection.onDidOpenTextDocument((params) => {
// 	// A text document got opened in VSCode.
// 	// params.textDocument.uri uniquely identifies the document. For documents store on disk this is a file URI.
// 	// params.textDocument.text the initial full content of the document.
// 	connection.console.log(`${params.textDocument.uri} opened.`);
// });
// connection.onDidChangeTextDocument((params) => {
// 	// The content of a text document did change in VSCode.
// 	// params.textDocument.uri uniquely identifies the document.
// 	// params.contentChanges describe the content changes to the document.
// 	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
// });
// connection.onDidCloseTextDocument((params) => {
// 	// A text document got closed in VSCode.
// 	// params.textDocument.uri uniquely identifies the document.
// 	connection.console.log(`${params.textDocument.uri} closed.`);
// });
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map