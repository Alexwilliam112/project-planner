const start_time = 1748797200000
const end_time = 1748797200000

// Add 8 hours (8 * 60 * 60 * 1000 ms) for GMT+8
const offset = 8 * 60 * 60 * 1000
const startDate = new Date(start_time + offset)
const endDate = new Date(end_time + offset)

console.log('Start Date (GMT+8):', startDate.toISOString())
console.log('End Date (GMT+8):', endDate.toISOString())

let A = 100
let B = 200

console.log(A-B)