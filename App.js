const thread = require("./src/Thread")
const nru = require("./src/NRU")
const mmu = require("./src/MMU")
function main() {
    thread.setPPage(5) // вказуємо кількість фізичних сторінок
    thread.setProcesses(10) // вказуємо кількість процесів
    let allProcesses = thread.createProcesses() // Створюєио процеси
    thread.setWTime(201) // Кількість тактів
    let vPage;
    for (let i = 0; i < thread.wTime; i++) {
        let currProcess = thread.RR(i, allProcesses) // Вибір процесу
        currProcess.length <= thread.pPage ? vPage =  Math.floor(Math.random() * currProcess.length)
            : vPage = thread.InSet(currProcess) //Випадковий вибір сторінки
        console.log("\nTime: " + i + " Process: " + i % thread.processes + " VirtualPage Index: " + vPage + "\n VirtualPage " +
            JSON.stringify(currProcess[vPage]))
        let write = Math.random() <= 0.5 // 50% читання 50% запис
            if (currProcess[vPage].P === false ){
                console.log("Start NRU for replacing pages:")
                let rPage = nru.findPageForReplace(currProcess) //пошук сторінки для заміни
                mmu.Replace(vPage,currProcess,rPage) //заміна сторінки
                thread.UnsetReplacedR(i % thread.processes,rPage) //Видалення помітки про сторінку з true R
                console.log("Process after replacing : ")
                console.log(currProcess)
            }
            thread.PushOrUpdateR(vPage,i % thread.processes,i)
            currProcess[vPage] = mmu.WriteOrRead(currProcess[vPage],write,i,currProcess) // запис або читання
        console.log("VirtualPage " +
            JSON.stringify(currProcess[vPage]))
        if (i % 40 === 0 && i !== 0){  // кожні 40 тактів перевірка на використання за останні 20 тактів
            thread.CheckLastUseR(allProcesses,i) //перевірка ,коли останній раз використовували сторінку з true R
            console.log("\nSettingTime + NumOfProcess + NumOfPage with R true bit: ")
            console.log(thread.arrayR)
        }
        }
    console.log("\nAllProcesses after 201 tacts: ")
    console.log(allProcesses)

    }
main()