'use-strict'
const AWS = require('aws-sdk')

const fetchItem = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters

    let response=null
    let statusCode = 200

    try {
        const result = await dynamodb.get({
            TableName: "ItemTable",
            Key: { id }
        }).promise();

        response = result.Item;

    } catch (error) {
        response = error
        statusCode = 500
    }

    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response),
    };
};

module.exports = {
    handler: fetchItem
};