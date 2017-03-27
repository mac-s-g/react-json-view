FROM node
MAINTAINER mac <mac.gainor.com>

# install the node modules at container build time
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /react && cp -a /tmp/node_modules /react

# Now add our project code
ADD . /react
WORKDIR /react

EXPOSE 2000
ENTRYPOINT ["/react/entrypoints/build.sh"]

