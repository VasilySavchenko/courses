# Variables
VERSION ?= latest
IMAGE_NAME = fast-wallet-frontend
ENVIRONMENT ?=
LATEST_COMMIT := $$(git rev-parse HEAD)
HOST_FOR_DOCKER_IMAGE ?= ghcr.io/boostylabs

IMAGE_BACKUP = $(HOST_FOR_DOCKER_IMAGE)/$(IMAGE_NAME)$(ENVIRONMENT):$(LATEST_COMMIT)
IMAGE_LATEST = $(HOST_FOR_DOCKER_IMAGE)/$(IMAGE_NAME)$(ENVIRONMENT):$(VERSION)

# Commands
build_image: ## Build Application docker image.
	DOCKER_BUILDKIT=1 docker build -f ./deploy/Dockerfile -t $(IMAGE_BACKUP) . && DOCKER_BUILDKIT=1 docker build -f ./deploy/Dockerfile -t $(IMAGE_LATEST) .

push_image: ## Push Application docker image.
	docker push $(IMAGE_BACKUP) && docker push $(IMAGE_LATEST)

docker: ## Build and push all necessary docker images.
	make build_image push_image
