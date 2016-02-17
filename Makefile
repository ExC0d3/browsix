
BOWER     ?= node_modules/.bin/bower
GULP      ?= node_modules/.bin/gulp
TSLINT    ?= node_modules/.bin/tslint
MOCHA     ?= node_modules/.bin/mocha

NPM_DEPS   = $(BOWER) $(GULP) $(TSLINT) $(MOCHA)
BUILD_DEPS = $(NPM_DEPS)

# quiet output, but allow us to look at what commands are being
# executed by passing 'V=1' to make, without requiring temporarily
# editing the Makefile.
ifneq ($V, 1)
MAKEFLAGS += -s
endif

# GNU make, you are the worst.
.SUFFIXES:
%: %,v
%: RCS/%,v
%: RCS/%
%: s.%
%: SCCS/s.%


all: dist

dist: $(BUILD_DEPS)
	@echo "  DIST"
	$(GULP)

serve: $(BUILD_DEPS)
	@echo "  SERVE"
	$(GULP) serve

node_modules: package.json
	@echo "  NPM"
	npm install --silent
	touch -c $@

$(NPM_DEPS): node_modules
	touch -c $@

bower_components: $(BOWER) bower.json
	@echo "  BOWER"
	$(BOWER) install --silent
	touch -c $@

test: $(BUILD_DEPS)
	@echo "  TEST"
	$(GULP) test

clean:
	rm -rf dist
	find . -name '*~' | xargs rm -f

distclean: clean
	rm -rf node_modules bower_components

.PHONY: all clean distclean test