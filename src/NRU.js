class NRU {
    findPageForReplace(currProcess) {
        let classPoint = 4 // 3-RM,2-R!M,1-!RM,0-!R!M  !M=0; !R=0; M*=1  R*=2
        let rPage;
        for (let i in currProcess){ // Для кожної робочої сторінки знаходимо класс ,вибираємо найменший
            if(currProcess[i].R*2+currProcess[i].M*1 < classPoint && currProcess[i].P !== false){
                classPoint = currProcess[i].R*2+currProcess[i].M*1
                rPage = i
            }
        }
        console.log("Found page for replace : Index " +  rPage + " Class: " +classPoint +"\n" +
            JSON.stringify(currProcess[rPage]) +"\n")
        return rPage

    }
}

module.exports = new NRU()