
exports.Row = (obj) => {
    let resoult = obj[0];
    return resoult;

}
exports.formate = (summary_screen, summary_battery, summary_mobile) => {
    let arr = []
    let a = summary_screen[0];
    let b = summary_battery[0];
    let c = summary_mobile[0]


    arr = { ...a[0], ...b[0], summary_battery: c }
    console.log(arr)
    return arr

}