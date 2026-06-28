# Set the base image containing nginx web server
# It'll also need to have alpine linux
FROM nginx:alpine

# Now I'm copying index.html (same directory) into the container, path is below
COPY index.html /usr/share/nginx/html/index.html

# Now again I document that it's using port 80
# Port 80 is anyways the standard port for HTTP websites, and default for Nginx
EXPOSE 80