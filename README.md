# pagerduty-review

Review your on call rotation in Pagerduty.

## Development

I recommend you use [nvm][1].

```bash
$ git@github.com:danriti/pagerduty-review.git
$ cd pagerduty-review
$ nvm use 4.4 # or nvm install 4.4
$ npm install
$ npm run server
```

## Docker Build

```bash
$ git@github.com:danriti/pagerduty-review.git
$ cd pagerduty-review
$ docker build -t danriti/pagerduty-review ./
$ export HIPCHAT_SUBDOMAIN=foobar
$ export HIPCHAT_ROOM_ID=1234
$ docker run -e HIPCHAT_SUBDOMAIN -e HIPCHAT_ROOM_ID -d -p 8080:8080 --name=pagerduty_review danriti/pagerduty-review:latest
```

[1]: https://github.com/creationix/nvm
