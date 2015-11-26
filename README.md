Boilerplate
==============

#How to setup new repo

First, clone the skeleton repository:
`git clone ssh://git@github.com/user/proj.git new_proj`
Then, cd to the repo, and get rid of the origin remote:
```cd new_repo
git remote rm origin```
And finally, create a new remote for the project (you may want to create a new project in github first):

`git remote add origin ssh://git@github.com/user/new_proj.git`
Now, when you do git push origin master, it should update the new project.


# How to run project

Setup:

- Run "npm install"

Development:

- run "npm run watch"

- run "npm run start"

Notes:






