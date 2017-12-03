## create-serverless

Reduce overhead, don't waste your time!

`create-serverless api --actions crud --endpoints users` 

Generates a serverless API with: 
  - DynamoDB table `users` 
  - POST `/users`, creates a user
  - GET `/users`, retrieves all users
  - GET `/users/{id}`, retrieves a single user by id
  - DELETE `/users/{id}`, delete a single user by id
  - PUT `/users/{id}`, update a single user by id