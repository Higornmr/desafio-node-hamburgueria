const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())


const orders = []


const checkClientId = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(client => client.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "customer not found" })
    }

    request.clientIndex = index
    request.clientId = id

    next()
}

app.get('/orders', (request, response) => {

    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, name, price, status } = request.body

    const client = { id: uuid.v4(), order, name, price, status }

    orders.push(client)

    return response.status(201).json(orders)
})

app.put('/orders/:id', checkClientId, (request, response) => {

    const index = request.clientIndex
    const id = request.clientId

    const updateOrder =  orders[index]

    updateOrder.status ="Pronto"

    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete('/orders/:id', checkClientId, (request, response) => {
    const index = request.ordersIndex
    

    orders.splice(index,1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`🚀 👨‍💻 Server started on port ${port}`)
})