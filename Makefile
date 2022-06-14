NODE=16

network:
	./network.sh

compile:
	docker run --user node -i --rm --name compile-realm-demo -e NODE_ENV=production -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run-script build

compile-ts:
	docker run --user node -i --rm --name compile-realm-demo -e NODE_ENV=production -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run-script build-ts

install:
	docker run -i --rm --name install-realm-demo -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm install ${PCKG}

install-dev:
	docker run -i --rm --name install-realm-demo -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm install ${PCKG} --save-dev

down:
	docker-compose down

up:
	docker-compose up

run: down install up

analyze-bundle:
	docker run --user node -i --rm --name compile-realm-demo -e NODE_ENV=production -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run-script analyze
	docker run -i --rm -p "8888:8888" \
	--name bundle-analyzer -v `pwd`:/usr/src/app \
	-w /usr/src/app node:${NODE} \
	./node_modules/.bin/webpack-bundle-analyzer ./ui/stats.json ./ui -h 0.0.0.0

package:
	./bin/package.sh

publish-ci: install
	docker run -i --rm -p "9198:1337" \
	-v `pwd`:/usr/src/app -w /usr/src/app \
	-e NPM_TOKEN=$(NPM_TOKEN) \
	node:${NODE} ./bin/publish-ci.js