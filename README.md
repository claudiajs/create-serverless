## create-serverless

Reduce overhead, don't waste your time!

### Serverless API
  
`create-serverless api --actions crud --endpoints users` 

Generates a serverless API with: 
  - POST `/users`, creates a user
  - GET `/users`, retrieves all users
  - GET `/users/{id}`, retrieves a single user by id
  - DELETE `/users/{id}`, delete a single user by id
  - PUT `/users/{id}`, update a single user by id
  - `package.json` with npm commands `create` and `deploy`

#### Want to add DynamoDB to your API?

Just add `--dynamodb` to the api command and it will create a table with the endpoint name

`create-serverless api --actions crud --endpoints users --dynamodb`  creates a DynamoDB table `users`

  
### Payment (Stripe)  

`create-serverless payment --stripe` 
  
Generates a serverless payment micro service, ready for Stripe Checkout integration with: 
- POST `/create-payment`, creates a Stripe charge