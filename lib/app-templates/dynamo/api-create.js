
api.post('/#{endpoint}', function (request) {
  var parameters = {
    TableName: '#{endpoint}',
    Item: {
      #{endpoint}Id: uuid(),
      #{endpoint}Name: request.body.#{endpoint}Name
    }
  };
  return dynamoDb
    .put(parameters)
    .promise()
}, { success: 201 });
