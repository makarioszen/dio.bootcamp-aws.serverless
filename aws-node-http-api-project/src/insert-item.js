'use-strict'
const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const insertItem = async (event) => {
    const { item } = JSON.parse(event.body)
    const createdAt = new Date().toISOString()
    const id = v4()

    const postedItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }
    let response = null;
    let statusCode = 200
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        response = await dynamodb.put(
            {
                TableName: 'ItemTable',
                Item: postedItem
            }
        ).promise()
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
            postedItem,
            response
        })
    }

}

module.exports = {
    handler: insertItem
}