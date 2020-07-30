export function prettyTime(duration: number): string {
  if (duration < 120000) {
    return `${Math.floor(duration / 1000)} secs`
  } else if (duration < 7200000) {
    return `${Math.floor(duration / 60000)} mins`
  } else if (duration < 172800000) {
    return `${Math.floor(duration / 3600000)} hours`
  } else {
    return `${Math.floor(duration / 86400000)} days`
  }
}

// export function prettyTime2(duration: number): string {
//   const d = _.time._duration(duration)
//   let str = ''
//   if (d.days > 0) {
//     str += `${d.days} days `
//   }
//   str += `${d.hours}h `
//   str += `${d.mins}m `
//   str += `${d.secs}s `
//   return str
// }
