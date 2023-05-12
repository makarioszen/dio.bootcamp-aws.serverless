'use-strict'
const AWS = require('aws-sdk')

const fetchItems = async (event) => {
    let response = null
    let statusCode = 200

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const results = await dynamodb.scan({
            TableName: "ItemTable"
        }).promise();

        response = results.Items;

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
    handler: fetchItems,
};