/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLSchema } from 'graphql';
import { addResolversToSchema } from '@graphql-tools/schema';
import logger from '../../utils/logger';
import { GraphQLContext } from '../../context';
import Dummy from './Dummy';

interface QueryComponent {
  name: string;
  component: {
    query: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
    resolver: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
  };
}

const resolverComponents: QueryComponent[] = [
  { name: 'Dummy', component: Dummy },
];

export const loadQueryResolvers = (schema: GraphQLSchema): GraphQLSchema => {
  addResolversToSchema({
    schema,
    resolvers: {
      Query: {
        health: () => {
          return 'Service is running';
        },
      },
    },
    updateResolversInPlace: true,
  });
  logger.info(`Loaded query resolver health`);

  resolverComponents.forEach(({ name: componentName, component }) => {
    Object.entries(component.query).forEach(([queryName, queryResolver]) => {
      try {
        addResolversToSchema({
          schema,
          resolvers: {
            Query: {
              [queryName]: queryResolver,
            },
          },
          updateResolversInPlace: true,
        });
        logger.info(`Loaded query resolver ${componentName}/${queryName}`);
      } catch (error: any) {
        logger.error(
          `Error while loading query resolver ${componentName}/${queryName}`,
        );
        logger.error(error);
        throw error;
      }
    });

    Object.entries(component.resolver).forEach(([queryName, queryResolver]) => {
      try {
        addResolversToSchema({
          schema,
          resolvers: {
            [componentName]: {
              [queryName]: queryResolver,
            },
          },
          updateResolversInPlace: true,
        });
        logger.info(`Loaded query resolver ${componentName}/${queryName}`);
      } catch (error: any) {
        logger.error(
          `Error while loading query resolver ${componentName}/${queryName}`,
        );
        logger.error(error);
        throw error;
      }
    });
  });

  return schema;
};
