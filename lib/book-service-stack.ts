import { Stack, StackProps } from "aws-cdk-lib";
import * as aws_iam from "aws-cdk-lib/aws-iam"
import * as aws_lambda from "aws-cdk-lib/aws-lambda"
import { Construct } from 'constructs'
import * as path from "node:path";
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as aws_apigateway from "aws-cdk-lib/aws-apigateway";
import { EndpointType } from "aws-cdk-lib/aws-apigateway";


export class BookServiceStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const lambdaRole = new aws_iam.Role(this, "bookRole", {
            roleName: "bookRole",
            assumedBy: new aws_iam.ServicePrincipal("lambda.amazonaws.com"),
        });

        const tenantUserRole = new aws_iam.Role(this, "TenantUserRoleBook", {
            roleName: "TenantUserRoleBook",
            assumedBy: new aws_iam.ArnPrincipal(lambdaRole.roleArn),
        })

        lambdaRole.addToPolicy(
            new aws_iam.PolicyStatement({
                resources: [tenantUserRole.roleArn],
                actions: ['sts:assumeRole'],
            })
        )

        /**
         * Create new four handlers in lambda including:
         * getBookHandler - getting a book
         * letBookHandler - list all the books
         * createBookHandler - create new book
         * deleteBookHandler - delete book from the list with valid isbn
         */
        const getBookHandler: nodeLambda.NodejsFunction =
            new nodeLambda.NodejsFunction(this, 'GetBookLambda', {
                runtime: aws_lambda.Runtime.NODEJS_18_X,
                entry: path.join(
                    __dirname,
                    '../src/handlers/get-book/get-book.handler.ts'
                ),
                memorySize: 1024,
                handler: 'handler',
                bundling: {
                    minify: true,
                },
                architecture: aws_lambda.Architecture.ARM_64,
            });

        const listBookHandler: nodeLambda.NodejsFunction =
            new nodeLambda.NodejsFunction(this, 'ListBookLambda', {
                runtime: aws_lambda.Runtime.NODEJS_18_X,
                entry: path.join(
                    __dirname,
                    '../src/handlers/list-book/list-book.handler.ts'
                ),
                memorySize: 1024,
                handler: 'handler',
                bundling: {
                    minify: true,
                },
                architecture: aws_lambda.Architecture.ARM_64,
            });

        const createBookHandler: nodeLambda.NodejsFunction =
            new nodeLambda.NodejsFunction(this, 'CreateBookLambda', {
                runtime: aws_lambda.Runtime.NODEJS_18_X,
                entry: path.join(
                    __dirname,
                    '../src/handlers/create-book/create-book.handler.ts'
                ),
                memorySize: 1024,
                handler: 'handler',
                bundling: {
                    minify: true,
                },
                architecture: aws_lambda.Architecture.ARM_64,
            });

        const deleteBookHandler: nodeLambda.NodejsFunction =
            new nodeLambda.NodejsFunction(this, 'DeleteBookLambda', {
                runtime: aws_lambda.Runtime.NODEJS_18_X,
                entry: path.join(
                    __dirname,
                    '../src/handlers/delete-book/delete-book.handler.ts'
                ),
                memorySize: 1024,
                handler: 'handler',
                bundling: {
                    minify: true,
                },
                architecture: aws_lambda.Architecture.ARM_64,
            });

        /**
         * Create API Gateway to provide public access
         */
        const apiGateway = new aws_apigateway.RestApi(
            this,
            'Book-service-api-APIG',
            {
                deployOptions: {
                    stageName: 'prod',
                },
                description:
                    'API Gateway for Book-service-api',
                endpointTypes: [EndpointType.REGIONAL],
            },
        )
        const bookServiceApiGateway = apiGateway.root.addResource('v1')
        const listBookEndpoint =
            bookServiceApiGateway.addResource('book')
        listBookEndpoint.addMethod(
            'GET',
            new aws_apigateway.LambdaIntegration(listBookHandler),
        )
        listBookEndpoint.addCorsPreflight({
            allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
            allowMethods: ['GET', 'OPTIONS'],
        })

        const getBookEndpoint =
            bookServiceApiGateway.addResource('{isbn}')
        getBookEndpoint.addMethod(
            'GET',
            new aws_apigateway.LambdaIntegration(getBookHandler),
        )
        getBookEndpoint.addCorsPreflight({
            allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
            allowMethods: ['GET', 'OPTIONS'],
        })

        const addBookEndpoint =
            bookServiceApiGateway.addResource('add')
        addBookEndpoint.addMethod(
            'POST',
            new aws_apigateway.LambdaIntegration(createBookHandler),
        )
        addBookEndpoint.addCorsPreflight({
            allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
            allowMethods: ['POST', 'OPTIONS'],
        })

        const deleteBookServiceApiGateway = bookServiceApiGateway.addResource('delete')
        const deleteBokEndpoint =
            deleteBookServiceApiGateway.addResource('{isbn}')
        deleteBokEndpoint.addMethod(
            'GET',
            new aws_apigateway.LambdaIntegration(deleteBookHandler),
        )
        deleteBokEndpoint.addCorsPreflight({
            allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
            allowMethods: ['GET', 'OPTIONS'],
        })
    }
}