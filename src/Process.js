const table = require("./VirtualPage")

class Process {
    createProcess(vPage,pPage){
        let tArray = new Array(vPage)

        for (let i =0;i<tArray.length;i++){
             if (i < pPage) {
                 tArray[i] = new table(true, false, false, i) // якщо є фізична стоірнка
             }
             else {
                 tArray[i] = new table(false, false, false, null) // якщо немає фізичної сторінки
             }

        }
        console.log("Process created . Amount of Virtual Pages : " +vPage )
        console.log(tArray)

        return tArray
    }
}
module.exports = new Process()