MAIN = meme-service

all: $(MAIN).js

$(MAIN).js:
#	rm ~/pkg/linux_js -r
	gopherjs build
	cp $(MAIN).js ../fs/usr/bin/$(MAIN)

.PHONY: $(MAIN).js
