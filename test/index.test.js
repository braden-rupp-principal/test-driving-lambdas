import { expect } from "@jest/globals"
import { handler } from "../src/index"

it('should return 200', async () => {
    
    const response = await whenHandlerIsCalled()

    expect(response.statusCode).toBe(200)
})

it('should return a json response ', async () => {
    
    const response = await whenHandlerIsCalled()

    expect(response.body).toEqual({message: 'Hello World'} )
})

it('should add path variable to response message', async () => {
    
    const event = {pathParameters: {name: 'Braden'}}

    const response = await whenHandlerIsCalled(event)

    expect(response.body).toEqual({message: 'Hello World Braden'})
})

it('should add query paramater to response message', async () => {
    
    const event = {
        pathParameters: {name: 'Braden'},
        queryStringParameters: {lastName: 'Rupp'}
    }

    const response = await whenHandlerIsCalled(event)

    expect(response.body).toEqual({message: 'Hello World Braden Rupp'})
})

it('should add not add a query paramater to the response if there is no path', async () => {
    
    const event = {
        queryStringParameters: {lastName: 'Rupp'}
    }

    const response = await whenHandlerIsCalled(event)

    expect(response.body).toEqual({message: 'Hello World'})
})

it('should return a bad request if lastName continas numbers', async () => {
    
    const event = {
        queryStringParameters: {lastName: 'Rupp1'}
    }

    const response = await whenHandlerIsCalled(event)

    expect(response.statusCode).toBe(400)
    expect(response.body.errorMessage).toEqual('lastName may not contain numbers')
})


const whenHandlerIsCalled = async (event = {}) => {
    return await handler(event)
} 