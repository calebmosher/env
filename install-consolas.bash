#!/bin/bash

# Make sure you have Homebrew installed first.
# Also you may need to change permissions on /usr/local first to install cabextract.
# Use this: $ sudo chown -R $USER /usr/local

set -e

brew install cabextract
cd /tmp
curl -LO https://sourceforge.net/projects/mscorefonts2/files/cabs/PowerPointViewer.exe
cabextract PowerPointViewer.exe
cabextract ppviewer.cab
open CONSOLA*.TTF
