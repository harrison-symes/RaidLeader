const names = [
  'Jasmine',
  'James',
  'Ursula',
  'Gaby',
  'Brady',
  'Kate',
  'Katherine',
  'Mel',
  'Steve',
  'Michael',
  'Rodrigo',
  'J Quest',
  'J Vial',
  'Sarrah',
  'Ming',
  'Rupert',
  'Jack',
  'Ro Han',
  'Piet',
  'Mix',
  'Ross',
  'Alisa',
  'Andrew',
  'Cici',
  'Elena',
  'Hannah',
  'Kelly',
  'Natalie',
  'Sarah',
  'Sherly',
  'Simon',
  'Thomasin',
  'Beverly',
  'Alan',
  'Zac',
  'Matt',
  'Jess',
  'Aaron',
  'Brian',
  'Ania',
  'Magda',
  'Carla',
  'Mike',
  'Chris',
  'Tom',
  'Usha',
  'Harrison',
  'TASTY SNACK',
  'Joseph',
  'Don',
  "Rajal",
  'Callan',
  'Yaz',
  'Skye',
  'Rich John'
]

module.exports = () => {
  let idx = Math.floor(Math.random() * names.length)
  return names[idx]
}
