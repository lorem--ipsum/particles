#!/usr/bin/env bash

ng build --prod --deploy-url "/particles/"
gh-pages -d dist/
