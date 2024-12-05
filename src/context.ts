export type GraphQLContext = {
  thisFieldIsAvailableInGraphQl: string;
};

export function createContext(): GraphQLContext {
  return {
    thisFieldIsAvailableInGraphQl: 'thisValueIsAvailableInGraphQl',
  };
}
