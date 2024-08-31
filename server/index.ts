import server from './server.ts'

const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Listening on port', ${port}`)
})
