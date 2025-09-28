.PHONY: help install build release clean version

# Default target
help:
	@echo "MiniOS App Catalog Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  install   - Install Node.js dependencies"
	@echo "  build     - Build all app zip files and catalog"
	@echo "  release   - Create complete release artifact"
	@echo "  clean     - Clean generated files"
	@echo "  version   - Update version (usage: make version VERSION=1.1.0)"
	@echo ""

install:
	npm install

build:
	npm run build

release: build
	npm run release

clean:
	rm -rf dist/ releases/ node_modules/

version:
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: Please specify VERSION"; \
		echo "Usage: make version VERSION=1.1.0"; \
		exit 1; \
	fi
	npm run version $(VERSION)