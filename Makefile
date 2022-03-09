react-build:
	yarn build

docker-build: react-build
	docker build --tag aamirov/evlabwebapps-langatlas:latest .

docker-push: docker-build
	docker push aamirov/evlabwebapps-langatlas:latest

build-push: docker-build docker-push

