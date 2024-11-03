import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Book, books } from "../../mock-data";

export const handler = async ({
    pathParameters
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!pathParameters?.isbn) {
            throw new Error("No isbn was found");
        }
        const { isbn } = pathParameters || {};
        const book = books.find((item) => item.isbn === isbn);
        if (!book) {
            throw new Error(`Unable to remove book as no book was found given ${isbn}.`)
        }

        const listOfBooks: Book[] = books.filter((item) => item.isbn !== isbn);

        return {
            statusCode: 200,
            body: JSON.stringify(listOfBooks)
        }
    } catch (error: any) {
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