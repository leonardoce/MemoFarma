#!/usr/bin/env sh
rm -r build
rm -r Resources
rm -r dist_playstore
ti build --platform android --target dist-playstore -K ../keystore_android_production -O dist_playstore
