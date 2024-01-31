#!/bin/bash

bun add -g wrangler

if [ -e "$HOME/dotfiles" ]; then
  cd "$HOME/dotfiles"
  git pull
else
  git clone https://github.com/Lucky3028/dotfiles.git "$HOME/dotfiles"
fi

bash ~/dotfiles/scripts/setup.sh

echo "Done!"
