const server = require('http').createServer()
const port = 8080
server.listen(port, () => console.log('Server listening on port ' + port))

export default server