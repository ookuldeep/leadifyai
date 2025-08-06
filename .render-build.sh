#!/usr/bin/env bash

# Install node modules (explicitly)
npm install

# Confirm node-fetch is present
npm ls node-fetch || npm install node-fetch@2.6.1

# Then start your server
npm start
