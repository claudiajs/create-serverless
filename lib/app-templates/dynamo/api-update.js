
api.put('/#{endpoint}/{id}', function (request) {
  var parameters = {
    TableName: '#{endpoint}',
    Key: {
      #{endpoint}Id: request.pathParams.id
    },
    UpdateExpression: 'set name = :n',
    ExpressionAttributeValues: {
      ':n': 'name'
    },
    ReturnValues: 'UPDATED_NEW'
  };

  return dynamoDb
    .update(parameters)
    .promise();
});
