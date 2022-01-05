import { ApolloError } from 'apollo-server';

export function NotFound(what: string) {
  throw new ApolloError(`${what} is not found!`, '404');
}
