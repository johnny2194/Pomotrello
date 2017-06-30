# HOW TO CONTRIBUTE


## Initial setup
1. Clone the repo.

  `git clone <projectRepo> <folderName>`

2. Make sure you are synced with the latest changes.

  `git pull`

3. Make sure you have the new changes in your local development branch.

  `git checkout -b development`

  `git merge origin/development`

4. You may want to set the upstream branch so you dont have to specify when pushing
  
  `git branch --set-upstream <localBranch> origin/<remoteBranch>`


## To start working on a new feature
1. Create a new branch based on the development branch with a sweet name:

  `git checkout -b <myNewFeature>  development`

2. Do some programming.
3. Commit often and meaningfully.
4. Write TTDz when applicable.
5. Keep your code nice and clean by adhering to the coding standards & guidelines.
6. Don't break tests or functionality.


## Preparing for a merge
1. Before submitting a pull request, pull development and merge into your branch - you may need to solve conflicts.

  `git checkout development`

  `git pull`

  `git checkout <myNewFeature>`

  `git merge development`

2. When you are done push your branch to origin

  `git push origin <myNewFeature>`


## Making a pull request
1. Go to our project's page in github.
2. Change to `<myNewFeature>` branch.
3. Click Pull Request.
4. Make sure the `<base>` is "development" and `<compare>` is "myNewFeature"
5. Write comments on what you did or what you changed.
6. Pull Requests need to be reviewed by someone else. DO NOT MERGE YOUR OWN PULL REQUESTS.
7. If you are working with someone else in specific areas of the project select the person(s)
  from the right hand menu "Reviewers" and send the Pull Request if that is not the case just
  send it anyone can pick your Pull Request.
8. Once your Pull Request has been merged delete your `<myNewFeature>` branch.

  `git branch -d <myNewFeature>`

9. Repeat.  


## Naming conventions
1. experimental - `experiment/<name>`
2. feature - `feature/<name>`
3. fixes - `hotfix/<name>`


## Stashing
1. stage your changes in the branch that you want to stash

  `git add --all`

2. DO NOT COMMIT. you can stash all the staged files:

  `git stash`

3. Then switch branch into the one that you want the changes to be in and you can put them here with:

  `git stash pop`


## Reverting changes when mistakes have been made
1. get the hashcode of the commit - you can see your commits with `git log`
2. Then you revert the commit by using this hashcode:

  `git revert <commitHashCode>`

3. you can revert the revert with the same process as it shows as another commit. 
