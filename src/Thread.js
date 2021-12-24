const process = require("./Process")
const mmu = require("./MMU")

class Thread {
    constructor(pPage,processes,wTime) {
        this.pPage = pPage
        this.processes = processes
        this.wTime = wTime
        this.arrayR = []
    }
    setPPage(N) {
        this.pPage = N
    }
    setProcesses(N) {
        this.processes = N
    }
    setWTime(N) {
        this.wTime = N
    }

    createProcesses() {
        let pArray = new Array(this.processes)
        let max = this.pPage*2
        let min = 2
        let allProcesses = new Array(this.processes)
        for (let i=0 ; i<this.processes; i++) {
            let vPages = Math.floor(Math.random() * max ) + min // генерація сторінок
            pArray[i]=vPages
            allProcesses[i] =process.createProcess(vPages,this.pPage)

        }
        return allProcesses
    }
    RR(N,allProcesses) {
        let chooseProc = N % this.processes
        return allProcesses[chooseProc]
    }
    InSet(currProcess) {
        let inSet = Math.random() <= 0.9 // 90% Working set 10% Other
        let vPage = Math.floor(Math.random() * currProcess.length)
        while (currProcess[vPage].P !== inSet){  // Вибір сторінки в  сеті
            vPage = Math.floor(Math.random() * currProcess.length)
        }
        return vPage
    }
    CheckLastUseR(allProcess,Time){
        let arrayForThis = []
        for ( let i of this.arrayR){
            if (Time - i[0] > 20){ // перевірка на проходження 20 тактів з моменту останнього використання
                console.log("R bit set to false for :" + "TimeOfSet :" + i[0] + " Process " + i[1] + " VirtualPage " + i[2])
                mmu.UnsetR(allProcess,i) // Видаляємо записи про сторінки з true R після їх зміни на false
            }
            else {
                    arrayForThis.push(i)
            }
        }
        this.arrayR = arrayForThis
    }
    UnsetReplacedR(currProcess,rPage){
        this.arrayR = this.arrayR.filter(a => a.toString() !== [a[0], currProcess, rPage ].toString())
    }
    PushOrUpdateR(vPage,currProcess,Time) {
        let indexForUpdate = -1
        for (let i in this.arrayR) {
            if (this.arrayR[i][1] === currProcess && this.arrayR[i][2] === vPage) {
                indexForUpdate = i
            }
        }
        if (indexForUpdate === -1) {
            this.arrayR.push([Time, currProcess, vPage]) //добавлення запису про сторінку з true R
        }
        else{
            this.arrayR[indexForUpdate][0] = Time //обновлення часу після звернення до  сторінки з true R
        }
    }
}

module.exports = new Thread()