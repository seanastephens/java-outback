npm run build-gh-pages \
	&& cd build \
	&& git commit -am "Build $(date)" \
	&& git push \
	&& cd ..
