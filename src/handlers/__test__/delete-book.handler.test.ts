import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../delete-book/delete-book.handler";

jest.mock('../../mock-data/books', () => ({
    books: [
        {
            "isbn":"9781593279509",
            "title":"Eloquent JavaScript, Third Edition",
            "subtitle":"A Modern Introduction to Programming",
            "author":"Marijn Haverbeke",
            "published":"2018-12-04T00:00:00.000Z",
            "publisher":"No Starch Press",
            "pages":472,
            "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website":"http://eloquentjavascript.net/"
        },
    ],
}));

describe('Delete books Handler Tests', () => {
    it('should remove a book if isbn is matched from the data', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { isbn: '9781593279509' },
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([]);
    });

    it('should return status code 400 and not found message given isbn', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: { isbn: '32148912384' },
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual(
            {
                "message": "Unable to remove book as no book was found given 32148912384."
            }
        );
    });
});