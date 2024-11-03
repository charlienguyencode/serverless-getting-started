import { handler } from "../list-book/list-book.handler";
import {APIGatewayProxyEvent} from "aws-lambda";

describe("List books Handler Tests", () => {
    it('should return a list of books', async () => {
        const response = await handler({} as APIGatewayProxyEvent);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{
            "author": "Marijn Haverbeke",
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "isbn": "9781593279509",
            "pages": 472,
            "published": "2018-12-04T00:00:00.000Z",
            "publisher": "No Starch Press",
            "subtitle": "A Modern Introduction to Programming",
            "title": "Eloquent JavaScript, Third Edition",
            "website": "http://eloquentjavascript.net/"
        }, {
            "author": "Nicolás Bevacqua",
            "description": "To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
            "isbn": "9781491943533",
            "pages": 334,
            "published": "2017-07-16T00:00:00.000Z",
            "publisher": "O'Reilly Media",
            "subtitle": "Dive into ES6 and the Future of JavaScript",
            "title": "Practical Modern JavaScript",
            "website": "https://github.com/mjavascript/practical-modern-javascript"
        }, {
            "author": "Nicholas C. Zakas",
            "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
            "isbn": "9781593277574",
            "pages": 352,
            "published": "2016-09-03T00:00:00.000Z",
            "publisher": "No Starch Press",
            "subtitle": "The Definitive Guide for JavaScript Developers",
            "title": "Understanding ECMAScript 6",
            "website": "https://leanpub.com/understandinges6/read"
        }, {
            "author": "Axel Rauschmayer",
            "description": "Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
            "isbn": "9781449365035",
            "pages": 460,
            "published": "2014-04-08T00:00:00.000Z",
            "publisher": "O'Reilly Media",
            "subtitle": "An In-Depth Guide for Programmers",
            "title": "Speaking JavaScript",
            "website": "http://speakingjs.com/"
        }, {
            "author": "Addy Osmani",
            "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
            "isbn": "9781449331818",
            "pages": 254,
            "published": "2012-08-30T00:00:00.000Z",
            "publisher": "O'Reilly Media",
            "subtitle": "A JavaScript and jQuery Developer's Guide",
            "title": "Learning JavaScript Design Patterns",
            "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
        }, {
            "author": "Kyle Simpson",
            "description": "The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
            "isbn": "9798602477429",
            "pages": 143,
            "published": "2020-01-28T00:00:00.000Z",
            "publisher": "Independently published",
            "subtitle": "Get Started",
            "title": "You Don't Know JS Yet",
            "website": "https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started"
        }, {
            "author": "Scott Chacon and Ben Straub",
            "description": "Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
            "isbn": "9781484200766",
            "pages": 458,
            "published": "2014-11-18T00:00:00.000Z",
            "publisher": "Apress; 2nd edition",
            "subtitle": "Everything you neeed to know about Git",
            "title": "Pro Git",
            "website": "https://git-scm.com/book/en/v2"
        }, {
            "author": "Caitlin Sadowski, Thomas Zimmermann",
            "description": "Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 \"Dagstuhl\" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.",
            "isbn": "9781484242216",
            "pages": 310,
            "published": "2019-05-11T00:00:00.000Z",
            "publisher": "Apress",
            "subtitle": "",
            "title": "Rethinking Productivity in Software Engineering",
            "website": "https://doi.org/10.1007/978-1-4842-4221-6"
        }]);
    });
})