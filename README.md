# puppeteer-mocha-chai-docker
Basic image for a testsuite using puppeteer, mocha and chai

## Usage
Run tests on your website:
```
docker-compose run --rm puppeteer-mocha-chai env URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html yarn test
```

Generate screenshots of your website:
```
docker-compose run --rm puppeteer-mocha-chai env URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html yarn screenshots
```
