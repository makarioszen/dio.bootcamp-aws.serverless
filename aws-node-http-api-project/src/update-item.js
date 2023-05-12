'use-strict'
const AWS = require('aws-sdk')

const updateItem = async (event) => {

    const { itemStatus } = JSON.parse(event.body)
    const { id } = event.pathParameters

    let response = null
    let statusCode = 200

    const dynamodb = new AWS.DynamoDB.DocumentClient()

    try {
        response = await dynamodb.update({
            TableName: "ItemTable",
            Key: { id },
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
                ':itemStatus': itemStatus
            },
            ReturnValues: "ALL_NEW"
        }).promise()
    } catch (error) {
        response = error
        statusCode = 500
    }

    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            response
        })
    }
};


module.exports = {
    handler: updateItem
}

