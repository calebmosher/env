# user
alias ls="ls -G"
alias ll="ls -l"
alias lla="ls -la"
alias renpm="rm -rf node_modules/ && npm install"
alias chrome="open -a 'Google Chrome'"
alias code="code --js-flags='--harmony-regexp-lookbehind'"

# thefuck
eval "$(thefuck --alias)"
eval "$(thefuck --alias FUCK)"

# git
source /Library/Developer/CommandLineTools/usr/share/git-core/git-completion.bash
source /Library/Developer/CommandLineTools/usr/share/git-core/git-prompt.sh

# env
export PS1="\[\e[0;37m\]\w \u\[\e[m\]\[\e[0;33m\]\$(echo \$(__git_ps1) | sed 's/[[:space:]]//g')\[\e[m\]\[\e[0;36m\]\$\[\e[m\] "
export EDITOR="subl -w"
export PATH=$PATH:/usr/local/lib/node_modules
export PATH=$PATH:/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin

# nvm
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

# upp
alias run-container="make clean && make run"
alias run-local="cd ~/upp/upp-docker/upp-db && run-container & cd ../upp-db-migration && run-container & cd ../upp-api && run-container & cd ../upp-api-client && run-container &"
