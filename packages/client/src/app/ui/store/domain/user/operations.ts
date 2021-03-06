import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Entity from '~client/app/application/businesses/user/entity';
import * as Repository from '~client/app/application/businesses/user/repository';
import * as GraphQLTypes from '~client/app/application/types/gen/api';
import { AsyncThunkConfig } from '~client/app/ui/store';

import * as Constants from './constants';
import * as Types from './types';

const name = `${Constants.parentsKey}/${Constants.featureKey}`;

export const fetchUser = createAsyncThunk<
  Types.Payload['operation']['fetchUser'],
  {
    id: Entity.User['id'];
  },
  AsyncThunkConfig<{ message: string }>
>(`${name}/fetchUser`, async (args, thunkAPI) => {
  try {
    const { data } = await thunkAPI.extra.api.query<
      GraphQLTypes.UserQuery,
      GraphQLTypes.UserQueryVariables
    >({
      query: GraphQLTypes.UserDocument,
      variables: { id: args.id },
    });

    return new Repository.UserRepository(data).toEntityUser;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const fetchBooks = createAsyncThunk<
  Types.Payload['operation']['fetchBooks'],
  {
    ids: Entity.Book['id'][];
  },
  AsyncThunkConfig<{ message: string }>
>(`${name}/fetchBooks`, async (args, thunkAPI) => {
  try {
    const { data } = await thunkAPI.extra.api.query<
      GraphQLTypes.UserFavoriteBooksQuery,
      GraphQLTypes.UserFavoriteBooksQueryVariables
    >({
      query: GraphQLTypes.UserDocument,
      variables: { ids: args.ids, page: { first: args.ids.length } },
    });

    return new Repository.UserFavoriteBooksRepository(data)
      .toEntityUserFavoriteBooks;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});
