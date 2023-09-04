import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { changeDateForm } from '../data'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Trips'],
    endpoints: builder => ({
        getTrips: builder.query({
            query: () => '/trips',
            transformResponse: response => response.map(trip => ({
                ...trip,
                startDate: new Date(changeDateForm(trip.from)).getTime(),
            }))
                .sort((a, b) => a.startDate - b.startDate),
            providesTags: ['Trips']
        }),
        addTrip: builder.mutation({
            query: newTrip => ({
                url: '/trips',
                method: 'POST',
                body: newTrip  
            }),
            invalidatesTags: ['Trips']
        })
    })
})

export const {
    useGetTripsQuery,
    useAddTripMutation
} = apiSlice