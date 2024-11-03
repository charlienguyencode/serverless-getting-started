import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { books } from "../../mock-data";
export const handler = async ({}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify(books)
    }
}