echo "Preparing a dedicated folder for the exported static content (one level above this repo)..."
mkdir ../commonspub-websites # in case it's our first run
cd ../commonspub-websites

echo "Preparing a dedicated git repo for the exported static site files..."
git init
git remote add origin git@gitlab.com:CommonsPub/websites.git
git pull origin master
