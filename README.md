# puppeteer-mocha-chai-docker
[![license](https://img.shields.io/github/license/schliflo/puppeteer-mocha-chai-docker.svg)](https://github.com/schliflo/puppeteer-mocha-chai-docker/blob/master/LICENSE)
[![Docker Automated build](https://img.shields.io/docker/automated/schliflo/puppeteer-mocha-chai-docker.svg)](https://hub.docker.com/r/schliflo/puppeteer-mocha-chai-docker/)
[![Docker Build Status](https://img.shields.io/docker/build/schliflo/puppeteer-mocha-chai-docker.svg)](https://hub.docker.com/r/schliflo/puppeteer-mocha-chai-docker/)

Basic docker image for tools and testsuites using [puppeteer](https://github.com/GoogleChrome/puppeteer), [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai)

## Usage
Run tests on your website:
```
# assuming you are in the directory with your tests
docker run \
    --rm \
    --tmpfs=/tmp \
    -e YARN_CACHE_FOLDER=/tmp/yarn \
    -v "$(pwd)":/validator/tests/ \
    -e URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html \
    -t schliflo/puppeteer-mocha-chai-docker \
    yarn test
```
```
docker-compose run \
    --rm \
    puppeteer-mocha-chai \
    env URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html \
    yarn test
```

Generate screenshots of your website:
```
# screenshots get saved to the current directory
docker run \
    --rm \
    --tmpfs=/tmp \
    -e YARN_CACHE_FOLDER=/tmp/yarn \
    -v "$(pwd)":/validator/screenshots/ \
    -e URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html \
    -t schliflo/puppeteer-mocha-chai-docker \
    yarn screenshots
```
```
docker-compose run \
    --rm \
    puppeteer-mocha-chai \
    env URLS=https://your-project.com/url-1.html,https://your-project.com/url-1.html \
    yarn screenshots
```
