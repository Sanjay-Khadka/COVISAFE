git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='Sanjay-Khadka'
    GIT_AUTHOR_EMAIL='sanjay1khadka@gmail.com'
    GIT_COMMITTER_NAME='Sanjay-Khadka'
    GIT_COMMITTER_EMAIL='sanjay1khadka@gmail.com'
  " HEAD
