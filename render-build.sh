#!/bin/bash

echo "🚀 Installing dependencies"
npm install

echo "📦 Ensuring node-fetch@2.6.1 is installed"
npm install node-fetch@2.6.1

echo "🟢 Starting backend server..."
npm start
