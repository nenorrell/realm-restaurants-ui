NODE=16

install:
	docker run -i --rm --name install-realm-demo -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm install ${PCKG}

down:
	docker-compose down

up:
	docker-compose up

run: down install up