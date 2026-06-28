# So I'm telling Docker which base image to start from
# the node:18 alpine image already contains Node.js runtime, npm, and Alpine Linux
FROM node:18-alpine

# I'm setting the working directory
# SInce it doesn't exist, Docker will create it automatically
WORKDIR /app

# Now I've to copy package.json from my dir into /app, and then install dependencies
# Btw the entire package.json for this project is creating with Claude
COPY package.json .
RUN npm install

# Next I copy everything from my directory into the container
COPY . .

# Document that the app uses port 300, just serves as metadata
EXPOSE 3000

# Next I need to run "node index.js"
# For this I'll just use CMD
CMD ["node", "index.js"]