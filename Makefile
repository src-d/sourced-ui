SUPERSET_REPO = https://github.com/apache/incubator-superset.git

superset:
	git clone --quiet --branch release--0.32 $(SUPERSET_REPO) superset

build: superset
	docker build -t smacker/superset:demo -f docker/Dockerfile .
