const { inputData } = require("./data.js");

const hands = inputData.split("\n").map(x => x.split(" "))

const cardRank = {"2" : 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "T": 10, "J": 1, "Q": 12, "K": 13, "A": 14}

const handsWithRanks = hands.map((pair) => {
        let cards = {}
        let jokers = 0 
        pair[0].split("").forEach(x => {
            if (x !== "J") {
                !cards[x] ? cards[x] = 1 : cards[x]++
            } else {
                jokers++
            }
        })
        let cardType = (Object.values(cards).sort((a,b) => b-a))
        cardType[0] ? cardType[0] += jokers : cardType[0] = jokers
        if (cardType[0] === 5) {
            return [...pair, 6]
        } else if (cardType[0] === 4) {
            return [...pair, 5]
        } else if (cardType[0] === 3 && cardType[1] === 2) {
            return [...pair, 4 ]
        } else if (cardType[0] === 3 && cardType[1] === 1) {
            return [...pair, 3]
        } else if (cardType[0] === 2 && cardType[1] === 2) {
            return [...pair, 2]
        } else if (cardType[0] === 2 && cardType [1] === 1) {
            return [...pair, 1]
        } else {
            return [...pair, 0]
        }
})

const sortedHands = handsWithRanks.sort((a,b) => {
        if (a[2] > b[2]) {
            return 1
        } else if (a[2] < b[2]) {
            return -1
        } else if (a[2] === b[2]) {
            for (let i = 0; i < a[0].length; i++) {
                if (cardRank[a[0][i]] > cardRank[b[0][i]]) {
                        return 1
                    } else if (cardRank[a[0][i]] < cardRank[b[0][i]]) {
                        return -1
                    } else {
                        continue
                    }
                }
        }
    })

const findTotal = (data) => {
    return data.reduce((acc, card, index) =>  acc + (+card[1]*(index+1)), 0)
}

console.log(findTotal(sortedHands))