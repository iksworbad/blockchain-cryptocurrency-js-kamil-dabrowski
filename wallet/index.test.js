const Wallet = require('./index');
const { veryfySingature } = require('../util/index');

describe('Wallet', () => {
    let wallet;

    beforeEach(()=>{
        wallet = new Wallet();
    });

    it('has a `balance`', ()=>{
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', ()=>{
        expect(wallet).toHaveProperty('publicKey');  
    });

    describe('signing data', () => {
        const data = 'foobar';

        it('veryfies a signature', ()=>{
           expect( veryfySingature({
                publicKey: wallet.publicKey,
                data,
                signature: wallet.sign(data) 
           })).toBe(true);
        });

        

        it('does not verify an invalid signature', () =>{
            expect(
                veryfySingature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: new Wallet().sign(data)
                })).toBe(false);
            
        });

    });


});