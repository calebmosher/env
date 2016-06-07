#!/bin/bash

# Make sure you have Homebrew installed first.
# Also you may need to change permissions on /usr/local first to install cabextract.
# Use this: $ sudo chown -R $USER /usr/local

set -e

brew install cabextract
cd /tmp
curl -O http://download.microsoft.com/download/f/5/a/f5a3df76-d856-4a61-a6bd-722f52a5be26/PowerPointViewer.exe
cabextract PowerPointViewer.exe
cabextract ppviewer.cab
open CONSOLA*.TTF
