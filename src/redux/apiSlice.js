import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformCharacter, transformComics } from "./apiUtils/transformUtils";

const _apiKey = 'apikey=cfbb1cd9aad16eab5d4e3373b2545ccd';

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query({
      query: (offset = 210) => `characters?limit=9&offset=${offset}&${_apiKey}`,
      transformResponse: (response) => {
        return response.data.results.map(transformCharacter)
      }
    }),
    getCharacter: builder.query({
      query: (id) => `characters/${id}?${_apiKey}`,
      transformResponse: (response) => {
        return transformCharacter(response.data.results[0])
      }
    }),
    getCharacterByName: builder.query({
      query: (name) => `characters?name=${name}&${_apiKey}`,
      transformResponse: (response) => {
        return response.data.results.map(transformCharacter)
      }
    }),
    getAllComics: builder.query({
      query: (offset = 0) => `comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`,
      transformResponse: (response) => {
        return response.data.results.map(transformComics)
      }
    }),
    getComic: builder.query({
      query: (id) => `comics/${id}?${_apiKey}`,
      transformResponse: (response) => {
        return transformComics(response.data.results[0])
      }
    }),
    getInfo: builder.query({
      query: ({ id, dataType }) => `${dataType}/${id}?${_apiKey}`,
      transformResponse: (response, meta, arg) => {
        if (arg.dataType === 'comics') {
          return transformComics(response.data.results[0]);
        } else if (arg.dataType === 'characters') {
          return transformCharacter(response.data.results[0]);
        }
      }
    })    
  })
})


export const { useGetAllCharactersQuery, useGetAllComicsQuery, useGetCharacterByNameQuery, useGetCharacterQuery, useGetComicQuery, useGetInfoQuery } = marvelApi;