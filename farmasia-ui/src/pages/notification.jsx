const Notification = ({ message, error}) => {
  
    const messageStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      width: '100%',
      zIndex: '999'
    }
  
    const errorStyle = {
      ...messageStyle,
      color: 'red'
    }
  
    if (message === '') {
      return <></>
    }
  
    if (error) {
      return <div style={errorStyle}>{message}</div>
    }
  
    return <div style={messageStyle}>{message}</div>
  }
  
  export default Notification