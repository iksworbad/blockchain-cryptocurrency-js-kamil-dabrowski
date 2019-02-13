const Block = require('./block');
const cryptoHash = require('./crypto-hash')


class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain [this.chain.length-1],
            data
        });
        this.chain.push(newBlock);
    }
    static isValidChain(chain){
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        
        for (let i = 1; i < chain.length; i++) {
            
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];

            const actualLastHash = chain[i-1].hash;
            

            if(lastHash !==actualLastHash) return false;

            const vlaidatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash !== vlaidatedHash) return false;

        }

        return true;
    }
   
}

module.exports = Blockchain;













