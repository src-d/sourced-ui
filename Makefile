# Package configuration
PROJECT = sourced-ui

# superset upstream configuration
SUPERSET_REPO = https://github.com/apache/incubator-superset.git
SUPERSET_VERSION = 0.33.0rc1
SUPERSET_REMOTE = superset
# directory to sync superset upstream with
SUPERSET_DIR = superset
# directory with custom code to copy into SUPERSET_DIR
PATCH_SOURCE_DIR = srcd
# name of the superset docker image to build
SUPERSET_IMAGE_NAME ?= srcd/sourced-ui

# Including ci Makefile
CI_REPOSITORY ?= https://github.com/src-d/ci.git
CI_PATH ?= $(shell pwd)/.ci
CI_VERSION ?= v1

MAKEFILE := $(CI_PATH)/Makefile.main
$(MAKEFILE):
	git clone --quiet --branch $(CI_VERSION) --depth 1 $(CI_REPOSITORY) $(CI_PATH);

-include $(MAKEFILE)

all: superset-remote-add

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
.PHONY: superset-build
superset-build: patch
	docker build -t $(SUPERSET_IMAGE_NAME):$(VERSION) -f superset/contrib/docker/Dockerfile superset

# Push the superset docker image, based on .ci/Makefile.main
superset-docker-push: docker-login superset-build
	@if [ "$(BRANCH)" == "master" && "$(DOCKER_PUSH_MASTER)" == "" ]; then \
		echo "docker-push is disabled on master branch" \
		exit 1; \
	fi; \
	docker push $(SUPERSET_IMAGE_NAME):$(VERSION); \
	if [ -n "$(DOCKER_PUSH_LATEST)" ]; then \
		docker tag $(SUPERSET_IMAGE_NAME):$(VERSION) \
			$(SUPERSET_IMAGE_NAME):latest; \
		docker push $(SUPERSET_IMAGE_NAME):latest; \
	fi;

superset-docker-push-latest-release:
	@DOCKER_PUSH_LATEST=$(IS_RELEASE) make superset-docker-push

# Clean superset directory from copied files
.PHONY: superset-clean
superset-clean:
	rm -f "$(SUPERSET_DIR)/superset_config.py"
	git clean -fd $(SUPERSET_DIR)

# Add superset upstream remote if doesn't exists
.PHONY: superset-remote-add
superset-remote-add:
	@if ! git remote | grep -q superset; then \
		git remote add -f $(SUPERSET_REMOTE) $(SUPERSET_REPO); \
	fi; \

# Prints list of changed files in local superset and upstream
.PHONY: diff-stat
diff-stat: superset-remote-add
	git diff-tree --stat $(SUPERSET_VERSION) HEAD:$(SUPERSET_DIR)/

# Prints unified diff of local superset  and upstream
.PHONY: diff
diff: superset-remote-add
	git diff-tree -p $(SUPERSET_VERSION) HEAD:$(SUPERSET_DIR)/

build: superset-build
clean: superset-clean
