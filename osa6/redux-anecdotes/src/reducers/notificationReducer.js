const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const showNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { notification }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer