import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'

import { apiSlice } from '../../app/api/apiSlice'

const climbsAdapter = createEntityAdapter({})

const initialState = climbsAdapter.getInitialState()

export const climbsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClimbs: builder.query({
            query: () => '/climbs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedClimbs = responseData.map(climb =>{
                    climb.id = climb._id
                    return climb
                });
                return climbsAdapter.setAll(initialState, loadedClimbs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Climb', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Climb', id}))
                    ]
                } else return [{ type: 'Climb', id: 'LIST' }]
            }
        }),
        addNewClimb: builder.mutation({
            query: initialClimbData => ({
                url: '/climbs',
                method: 'POST',
                body: {
                    ...initialClimbData
                }
            }),
            invalidatesTags: [
                { type: 'Climb', id: 'LIST'}
            ]
        }),
        updateClimb: builder.mutation({
            query: initialClimb => ({
                url: '/climbs',
                method: 'PATCH',
                body: {
                    ...initialClimb,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Climb', id: arg.id }
            ]
        }),
        deleteClimb: builder.mutation({
            query: ({ id }) => ({
                url: '/climbs',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Climb', id: arg.id}
            ]
        })
    })
})

export const {
    useGetClimbsQuery,
    useAddNewClimbMutation,
    useUpdateClimbMutation,
    useDeleteClimbMutation,
} = climbsApiSlice

// returns the query result object
export const selectClimbsResult = climbsApiSlice.endpoints.getClimbs.select()

// creates memoized selector
const selectClimbsData = createSelector(
    selectClimbsResult,
    climbsResult => climbsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllClimbs,
    selectById: selectClimbById,
    selectIds: selectClimbIds
    // Pass in a selector that returns the climbs slice of state
} = climbsAdapter.getSelectors(state => selectClimbsData(state) ?? initialState)