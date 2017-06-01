import request from 'superagent'

export const receiveGreetings = (greetings) => {
  return {
    type: 'RECEIVE_GREETINGS',
    greetings
  }
}

export function getGreetings () {
  return (dispatch) => {
    request
      .get(`/api/greetings`)
      .end((err, res) => {
        if (err) {
          console.error(err.message)
          return
        }
        dispatch(receiveGreetings(res.body))
      })
  }
}
