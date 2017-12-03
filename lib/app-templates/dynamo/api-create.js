
api.post('/#{endpoint}', function (request) {
  var parameters = {
    TableName: '#{endpoint}',
    Item: {
      #{endpoint}Id: request.body.#{endpoint}Id
    }
  };
  return dynamoDb
    .put(parameters)
    .promise()
}, { success: 201 });
