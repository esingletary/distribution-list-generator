# Use node v8 as the base image.
FROM mhart/alpine-node:8

ADD . .

RUN npm install --production

EXPOSE 5000

# Run node
CMD ["node", "app.js"]
