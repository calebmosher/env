#!/bin/bash

# Make sure VS Code is installed first

set -e

ln -s ~/env/vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/env/vscode/theme-cal ~/.vscode/extensions/theme-cal
ln -s ~/env/vscode/maxcudich.nl-ejs-0.0.3 ~/.vscode/extensions/maxcudich.nl-ejs-0.0.3
echo "👌👌👌 Created settings.json, theme-cal/, and maxcudich.nl-ejs-0.0.3/ symlinks."
