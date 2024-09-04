import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'

import { apiSlice } from '../../app/api/apiSlice'

const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
});

const initialState = commentsAdapter.getInitialState()

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComments: builder.query({
            query: () => ({
                url: '/comments',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedComments = responseData.map(comment => {
                    comment.id = comment._id
                    return comment
                });
                return commentsAdapter.setAll(initialState, loadedComments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Comment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Comment', id}))
                    ]
                } else return [{ type: 'Comment', id: 'LIST' }]
            }
        }),
        getAllCommentsForClimb: builder.query({
            query: (climbId) => ({
                url: `/comments/${climbId}/`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedComments = responseData.map(comment => {
                    comment.id = comment._id
                    return comment
                });
                return commentsAdapter.setAll(initialState, loadedComments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Comment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Comment', id }))
                    ]
                } else return [{ type: 'Comment', id: 'LIST' }]
            }
        }),
        addNewComment: builder.mutation({
            query: initialComment => ({
                url: '/comments',
                method: 'POST',
                body: {
                    ...initialComment,
                }
            }),
            invalidatesTags: [
                { type: 'Comment', id: "LIST" }
            ]
        }),
        updateComment: builder.mutation({
            query: initialComment => ({
                url: '/comments',
                method: 'PATCH',
                body: {
                    ...initialComment,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.id }
            ]
        }),
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `/comments`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCommentsQuery,
    useGetAllCommentsForClimbQuery,
    useAddNewCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentsApiSlice

// returns the query result object
export const selectCommentsResult = commentsApiSlice.endpoints.getComments.select()

// creates memoized selector
const selectCommentsData = createSelector(
    selectCommentsResult,
    commentsResult => commentsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds
    // Pass in a selector that returns the comments slice of state
} = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? initialState)