# First I need to specify the base image for the container
FROM node:20-alpine

# Setting the working directory to app (it'll create the dir)
WORKDIR /app

# I copy dependencies file into it, then install them
COPY package*.json ./
RUN npm install

# Copy everything into the container
COPY . .

# Document that port 3000 is being used
EXPOSE 3000

# I want to run "npm run dev -- --host"
CMD ["npm", "run", "dev", "--", "--host"]