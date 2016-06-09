# Env

Dev environment setup for new machines.

## Setup

**Clone this Repo** (to the home directory)

```bash
$ cd
$ git clone https://github.com/calebmosher/env.git
```

**Link Shell Config**

```bash
$ cd
$ ln -s ~/env/.bash_profile .bash_profile
$ ln -s ~/env/.bashrc .bashrc
```

**Install Xcode**

```bash
$ xcode-select --install
```

**Install Homebrew**

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You may want to change permissions on `/usr/local` after this step for future `brew` installs.

```bash
$ sudo chown -R $(whoami) /usr/local
```

**Install Consolas** (if necessary)

```bash
$ ~/env/install-consolas.bash
```

**Install Node/Npm and Nvm**

```bash
$ brew install node
$ brew install nvm
$ cd
$ mkdir .nvm
$ . .bashrc
```

## Sublime

**Install Sublime Text 3**

Google for DMG.

**Link `subl`** (to `/usr/local/bin`)

```bash
$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
```

**Install Package Control**

Google for Python script. Restart Sublime.

**Link Preferences and Syntax Theme**

```bash
$ cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/User
$ ln -s ~/env/sublime/Caleb.tmTheme Caleb.tmTheme
$ ln -s ~/env/sublime/Preferences.sublime-settings Preferences.sublime-settings
```

**Install Packages**

Use ⌘ + ⇧ + P, then "Install Package".

* Primer Theme
* Babel
* SCSS
* Unicode Character Highlighter

## Other

* Install Spectacle ([spectacleapp.com](http://spectacleapp.com))
