const table = require("./VirtualPage")

class MMU {
   Replace(vPage,currProcess,rPage){
      currProcess[vPage].P = currProcess[rPage].P
      currProcess[vPage].PPN = currProcess[rPage].PPN
      currProcess[rPage] = new table(false, false, false, null) //
      return currProcess
   }
   WriteOrRead(vPage,write){
      if (write === false) {
         console.log("Reading data")
         vPage.R=true
      }
      else {
         console.log("Writing data")
         vPage.R=true
         vPage.M=true
      }
      return vPage
   }
   UnsetR(allProcess,arrayR) {
      allProcess[arrayR[1]][arrayR[2]].R = false
      return allProcess
}
}

module.exports = new MMU()