import level from 'level'

const options = {
    valueEncoding: 'json'
}
const db = level('./src/server/db/sharedDB.db', options)
const initial_state = {
    name: 'sharedDB',
    created: new Date().getTime()
}

db.get('sharedDB', (err,value) => {
    if(err || !value) {
        db.put('sharedDB', initial_state, (err) => {
            if(err) return console.log(err)
        })
    }

    console.log(value)
})

export default db