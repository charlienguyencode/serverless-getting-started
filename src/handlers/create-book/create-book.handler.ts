import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Book } from "../../mock-data";

export const handler = async (
  event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event?.body) {
            throw new Error("No movie");
        }

        const book: Book = event.body ? JSON.parse(event.body) : {} as Book;
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...book
            })
        }
    } catch (error) {
        let errorMessage: string = 'Unknown.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            statusCode: 400,
            body: JSON.stringify({
                message: errorMessage
            })
        };
    }
}