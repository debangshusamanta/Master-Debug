#!/bin/bash

echo "📦 Installing OpenJDK..."

apt-get update
apt-get install -y openjdk-17-jdk

echo "✅ Java installed:"
java -version
javac -version