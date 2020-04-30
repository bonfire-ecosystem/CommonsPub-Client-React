#!/bin/bash

[ ! -d "../commonspub-websites" ] && echo "Directory for the built site DOES NOT exists. Inititalise now..." && ./storybook_deploy_setup.sh

# echo "Making sure code changes are committed..."
# git add *
# git commit -m "Frontend update (autocommit while deploying storybook)"
# echo "Making sure commits have been pushed..."
# git push

echo "Building the static site..."
yarn build-storybook # generate styleguide

echo "Deploying the static content to a dedicated git repo..."
rm -rf ../commonspub-websites/storybook
mv storybook-static ../commonspub-websites/storybook
cd ../commonspub-websites/
git add *
git commit -m "Storybook update"
git pullls 
git push -u origin master
