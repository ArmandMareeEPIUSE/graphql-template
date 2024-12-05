/* eslint-disable @typescript-eslint/no-explicit-any */
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import logger from '../../utils/logger';
import Dummy from './Dummy';
import { GraphQLContext } from '../../context';

export interface MutationComponent {
  name: string;
  component: {
    mutation: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
  };
}

const muationComponents: MutationComponent[] = [
  { name: 'Dummy', component: Dummy },
];

export const loadMutationResolvers = (schema: GraphQLSchema): GraphQLSchema => {
  muationComponents.forEach(({ name: componentName, component }) => {
    Object.entries(component.mutation).forEach(
      ([mutationName, mutationResolver]) => {
        try {
          addResolversToSchema({
            schema,
            resolvers: {
              Mutation: {
                [mutationName]: mutationResolver,
              },
            },
            updateResolversInPlace: true,
          });
          logger.info(
            `Loaded mutation resolver ${componentName}/${mutationName}`,
          );
        } catch (error: any) {
          logger.error(
            `Error while loading mutation resolver ${componentName}/${mutationName}`,
          );
          logger.error(error);
          throw error;
        }
      },
    );
  });

  return schema;
};
