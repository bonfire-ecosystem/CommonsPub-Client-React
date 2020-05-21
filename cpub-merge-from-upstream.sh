# This script helps merge upstream updates while preserving local customisations

# Check out the MoodleNet branch you wish to merge to
git checkout flavour/moodlenet

# Pull changes from upstream
git pull https://gitlab.com/moodlenet/frontend.git develop 

# Copy upstream changes to our MoodleNet branch
git push

# Check out the CommonsPub branch you wish to merge to
git checkout flavour/commonspub

# merge MoodleNet to CommonsPub, but don't commit
git merge --no-ff --no-commit flavour/moodlenet

# Restore files which we don't want overwritten (add any core files that should be different in CommonsPub to the below line)
for file in cpub-merge-from-upstream.sh README.md src/mn-constants.tsx public/index.html .env.example .env.secrets.example docker-compose.yml docker-compose.pi.yml .gitlab-ci.yml
do
    git reset HEAD ${file}
    git checkout -- ${file}
done


echo "Please check if everything looks good (including resolved any merge conflicts) before continuing. Press 'c' to merge and push the changes, or just enter to abort."
read answer
if echo "$answer" | grep -iq "^c" ; then
    echo "Merging and pushing..."
    git commit -m "merged from upstream"
    git push
else 
    echo "Aborting the merge."
    git merge --abort
    exit 1
fi