const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require('graphql');
const { resolve } = require('path');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send(`<h1>How are you?</h1>`);
});

const author = [
	{
		id: 1,
		name: 'Naimul Islam',
	},
	{
		id: 2,
		name: 'Naimul Islam Shakil',
	},
	{
		id: 3,
		name: 'Naimul Islam Naim',
	},
];

const books = [
	{ id: 1, name: 'PhP Interview Questene', authorId: 1 },
	{ id: 2, name: 'JavaScript Interview Questene', authorId: 2 },
	{ id: 3, name: 'Node Interview Questene', authorId: 3 },
	{ id: 4, name: 'React Interview Questene', authorId: 1 },
];

const BookType = new GraphQLObjectType({
	name: 'BookType',
	description: '',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		authorId: { type: GraphQLInt },
		authorName: {
			type: GraphQLString,
			description: '',
			resolve: (book) => {
				let w = author.find((a) => a.id === book.authorId);
				return w.name;
			},
		},
	}),
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

		// books list
		books: {
			type: new GraphQLList(BookType),
			description: 'This is book type',
			resolve: () => {
				return books;
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
