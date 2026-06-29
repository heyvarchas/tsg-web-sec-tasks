# I need to base image - Node.js 20 image based on Alpine Linux
FROM node:20-alpine AS builder

# I'm setting the working directory to app..
# Since it doesn't exist, Docker will create one
WORKDIR /app

# Then I want to copy the dependencies file into working directory
COPY package*.json ./

# Now I'm installing dependencies
RUN npm install

# Now that that's done, I'm going to copy everything into the working directory
COPY . .

# Next I run the build script defined in package.json
RUN npm run build

# Now I start a second build stage
FROM nginx:alpine

# Copies files from builder stage into Nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# I just record that the container listens on port 80
EXPOSE 80

# I want to run nginx -g "daemon off;"
# Normally nginx runs in the background as daemon, so if i switch it off
# nginx runs in the main container process
CMD ["nginx", "-g", "daemon off;"]