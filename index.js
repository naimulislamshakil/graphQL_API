const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send(`<h1>How are you?</h1>`);
});

const RootQuaryType = new GraphQLObjectType({
	name: 'RootQuary',
	description: 'This is root quary',
	fields: () => ({
		test: {
			type: GraphQLString,
			description: 'test field',
			resolve: () => {
				return 'Hello World';
			},
		},

		welcome: {
			type: GraphQLString,
			description: 'Welcome field',
			resolve: () => {
				return 'Welcome to Graphql Server';
			},
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQuaryType,
});

app.use(
	'/graphql',
	graphqlHTTP({
		graphiql: true,
		schema: schema,
	})
);

app.listen(port, () => {
	console.log('GraphQL server is running.');
});
