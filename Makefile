# Superset upstream configuration
SUPERSET_REPO = https://github.com/apache/incubator-superset.git
SUPERSET_VERSION = 0.33.0rc1
SUPERSET_REMOTE = superset
# Directory to sync superset upstream with
SUPERSET_DIR = superset
# Directory with custom code to copy into SUPERSET_DIR
PATCH_SOURCE_DIR = srcd

# Name of the docker image to build
DOCKER_IMAGE_NAME ?= srcd/sourced-ui
# Docker registry where the docker image should be pushed to.
DOCKER_REGISTRY ?= docker.io
# Docker organization to be used at the docker image name.
DOCKER_ORG ?= srcd
# Username used to login on the docker registry.
DOCKER_USERNAME ?=
# Password used to login on the docker registry.
DOCKER_PASSWORD ?=
# When `make docker-push`, setting DOCKER_PUSH_LATEST to any non-empty value
# will cause make docker-push to also push the latest tag.
DOCKER_PUSH_LATEST ?=

# Build information
VERSION ?= latest
# Travis CI
ifneq ($(TRAVIS_TAG), )
	VERSION := $(TRAVIS_TAG)
endif

# IS_RELEASE is "true" if tag is semantic version and not a pre-release
IS_RELEASE := $(shell echo $(VERSION) | grep -q -E '^v[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+$$' && echo "true" || true)

all: build

# Copy src-d files in the superset repository
.PHONY: patch
patch: clean
	cp -r $(PATCH_SOURCE_DIR)/* $(SUPERSET_DIR)/

# Copy src-d files in the superset repository using symlinks. it's useful for development.
# Allows to run flask locally and work only inside superset directory.
.PHONY: patch-dev
patch-dev: clean
	@diff=`diff -r $(PATCH_SOURCE_DIR) $(SUPERSET_DIR) | grep "$(PATCH_SOURCE_DIR)" | awk '{gsub(/: /,"/");print $$3}'`; \
	for file in $${diff}; do \
		to=`echo $${file} | cut -d'/' -f2-`; \
		ln -s "$(PWD)/$${file}" "$(SUPERSET_DIR)/$${to}"; \
	done; \
	ln -s "$(PWD)/$(PATCH_SOURCE_DIR)/superset/superset_config_dev.py" "$(SUPERSET_DIR)/superset_config.py"; \

# Create docker image
.PHONY: patch
build: patch
	docker build -t $(DOCKER_IMAGE_NAME):$(VERSION) -f superset/contrib/docker/Dockerfile $(SUPERSET_DIR)

.PHONY: docker-validate
docker-validate:
	@if [ -z "$(DOCKER_USERNAME)" ]; then \
		echo "DOCKER_USERNAME variable cannot be empty."; \
		exit 1; \
	fi; \
	if [ -z "$(DOCKER_PASSWORD)" ]; then \
		echo "DOCKER_PASSWORD variable cannot be empty."; \
		exit 1; \
	fi

.PHONY: docker-login
docker-login: docker-validate
	@docker login -u "$(DOCKER_USERNAME)" -p "$(DOCKER_PASSWORD)" $(DOCKER_REGISTRY); \

# Push the docker image
.PHONY: docker-push
docker-push: docker-login build
	@if [ "$(BRANCH)" == "master" && "$(DOCKER_PUSH_MASTER)" == "" ]; then \
		echo "docker-push is disabled on master branch" \
		exit 1; \
	fi; \
	docker push $(DOCKER_IMAGE_NAME):$(VERSION); \
	if [ -n "$(DOCKER_PUSH_LATEST)" ]; then \
		docker tag $(DOCKER_IMAGE_NAME):$(VERSION) \
			$(DOCKER_IMAGE_NAME):latest; \
		docker push $(DOCKER_IMAGE_NAME):latest; \
	fi;

.PHONY: docker-push-latest-release
docker-push-latest-release:
	@DOCKER_PUSH_LATEST=$(IS_RELEASE) make docker-push

# Clean superset directory from copied files
.PHONY: clean
clean:
	rm -f "$(SUPERSET_DIR)/superset_config.py"
	git clean -fd $(SUPERSET_DIR)

# Add superset upstream remote if doesn't exists
.PHONY: remote-add
remote-add:
	@if ! git remote | grep -q superset; then \
		git remote add -f $(SUPERSET_REMOTE) $(SUPERSET_REPO); \
	fi; \

# Prints list of changed files in local superset and upstream
.PHONY: diff-stat
diff-stat: remote-add
	git diff-tree --stat $(SUPERSET_VERSION) HEAD:$(SUPERSET_DIR)/

# Prints unified diff of local superset  and upstream
.PHONY: diff
diff: remote-add
	git diff-tree -p $(SUPERSET_VERSION) HEAD:$(SUPERSET_DIR)/
