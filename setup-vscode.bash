#!/bin/bash

# Make sure VS Code is installed first

set -e

ln -s ~/env/vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json
ln -s ~/env/vscode/theme-cal ~/.vscode/extensions/theme-cal
echo "Created settings.json and theme-cal/ symlinks."
