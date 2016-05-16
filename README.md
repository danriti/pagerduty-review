# pagerduty-review

Review your on call rotation in Pagerduty.

## Setup

```bash
$ cd pagerduty-review
$ docker build -t danriti/pagerduty-review ./
$ export HIPCHAT_SUBDOMAIN=foobar
$ export HIPCHAT_ROOM_ID=1234
$ docker run -e HIPCHAT_SUBDOMAIN -e HIPCHAT_ROOM_ID -d -p 8080:8080 --name=pagerduty_review danriti/pagerduty-review:latest
```
