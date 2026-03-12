export function formatCreatedTime(date: string) {
  const dateValue = new Date(date)
  const createdTime = dateValue.getTime()
  const currentTime = Date.now()
  const dateDifference = currentTime - createdTime

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (dateDifference < minute) return '방금 전'
  if (dateDifference < hour)
    return `${Math.floor(dateDifference / minute)}분 전`
  if (dateDifference < day) return `${Math.floor(dateDifference / hour)}시간 전`
  if (dateDifference < 7 * day)
    return `${Math.floor(dateDifference / day)}일 전`

  return `${dateValue.getFullYear()}년 ${dateValue.getMonth() + 1}월 ${dateValue.getDate()}일`
}
