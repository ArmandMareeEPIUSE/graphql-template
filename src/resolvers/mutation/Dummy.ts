import { GraphQLContext } from '../../context';
type DummyCreateInput = {
  name: string;
};
type DummyUpdateInput = {
  id: string;
} & DummyCreateInput;
type DummyDeleteInput = {
  id: string;
};

export const mutation = {
  createDummy: (
    parent: unknown,
    args: DummyCreateInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-1`,
      name: `dummy-name-${args.name}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  updateDummy: (
    parent: unknown,
    args: DummyUpdateInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  deleteDummy: (
    parent: unknown,
    args: DummyDeleteInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
};

export default {
  mutation,
};
