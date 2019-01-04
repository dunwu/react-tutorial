@echo off
echo [INFO] deploy dist to gh-pages.
cd ../dist
git init
git add -A
git commit -am "deploy"
git push -f git@github.com:dunwu/react-tutorial.git master:gh-pages"
cd ..
