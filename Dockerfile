FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
