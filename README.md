## create-serverless

Reduce overhead, don't waste your time!

### Serverless API
  
`create-serverless api --actions crud --endpoints users --dynamodb` 

Generates a serverless API with: 
  - DynamoDB table `users` 
  - POST `/users`, creates a user
  - GET `/users`, retrieves all users
  - GET `/users/{id}`, retrieves a single user by id
  - DELETE `/users/{id}`, delete a single user by id
  - PUT `/users/{id}`, update a single user by id
  
  
### Payment (Stripe)  

`create-serverless payment --stripe` 
  
Generates a serverless payment micro service, ready for Stripe Checkout integration with: 
- POST `/create-payment`, creates a Stripe charge