#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import {BookServiceStack} from "../lib/book-service-stack";

const app = new cdk.App();
new BookServiceStack(app, 'BookServiceAPIStack', {});