import { GraphQLContext } from '../../context';

interface Dummy {
  id: string;
  name: string;
}

export const query = {
  dummy: (parent: unknown, args: { id: string }, context: GraphQLContext) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  dummies: () => {
    return [
      {
        id: `dummy-id-1`,
        name: `dummy-name-1`,
      },
      {
        id: `dummy-id-2`,
        name: `dummy-name-2`,
      },
    ];
  },
};

export const resolver = {
  id: (parent: Dummy) => {
    return parent.id;
  },

  name: (parent: Dummy) => {
    return parent.name;
  },
};

export default {
  query,
  resolver,
};
