export const handleResponse = (res) => {
  if (res.data.status !== '0') {
    console.log('error')
  } else {
    return res.data.result
  }
}
