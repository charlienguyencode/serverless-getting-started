import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../create-book/create-book.handler";

describe('Create books Handler Tests', () => {
    it('should handle null body and return no movie message', async () => {
        const event: APIGatewayProxyEvent = {
            body: null
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual("{\"message\":\"No movie\"}");
    });

    it('should return new book when body is supplied', async () => {
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify({
                isbn :"9781593279509",
                title:"Eloquent JavaScript, Third Edition",
                subtitle:"A Modern Introduction to Programming",
                author:"Marijn Haverbeke",
                published:"2018-12-04T00:00:00.000Z",
                publisher:"No Starch Press",
                pages:472,
                description:"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
                website:"http://eloquentjavascript.net/"
            })
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
            "author": "Marijn Haverbeke",
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "isbn": "9781593279509",
            "pages": 472,
            "published": "2018-12-04T00:00:00.000Z",
            "publisher": "No Starch Press",
            "subtitle": "A Modern Introduction to Programming",
            "title": "Eloquent JavaScript, Third Edition",
            "website": "http://eloquentjavascript.net/"
        });
    });

    it('should throw an error message when body is invalid', async () => {
        const event: APIGatewayProxyEvent = {
            body: {}
        } as any;

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            "message": "Unexpected token o in JSON at position 1",
        });
    });
});