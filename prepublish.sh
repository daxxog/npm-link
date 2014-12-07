#!/bin/sh
# NpmLink / prepublish.sh
# prepublish script for NpmLink
# (c) 2014 David (daXXog) Volm ><> + + + <><
# Released under Apache License, Version 2.0:
# http://www.apache.org/licenses/LICENSE-2.0.html  
#################################################

if [ ! -f com-npm-install ]; then
	node make
	rm npm-debug.log >> /dev/null
	mv npm-link.js ../.tmp.js
	mv npm-link.h ../.tmp.h
else
	rm com-npm-install
fi