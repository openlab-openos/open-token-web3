"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_MINT_2022 = exports.NATIVE_MINT = exports.ASSOCIATED_TOKEN_2022_PROGRAM_ID = exports.ASSOCIATED_TOKEN_PROGRAM_ID = exports.TOKEN_2022_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = void 0;
exports.programSupportsExtensions = programSupportsExtensions;
const web3_js_1 = require("@solana/web3.js");
/** Address of the SPL Token program */
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
/** Address of the SPL Token 2022 program */
exports.TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('Token9ADbPtdFC3PjxaohBLGw2pgZwofdcbj6Lyaw6c');
/** Address of the SPL Associated Token Account program */
exports.ASSOCIATED_TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
exports.ASSOCIATED_TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('AtokenhZ6AE34VMYRv1AqSv8q8QZJxxEaY1zKiXKwSWT');
/** Address of the special mint for wrapped native SOL in spl-token */
exports.NATIVE_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
/** Address of the special mint for wrapped native SOL in spl-token-2022 */
exports.NATIVE_MINT_2022 = new web3_js_1.PublicKey('B67JGY8hbUcNbpMufKJ4dF3egfbZuD4EkyffQ3cxZcUz');
/** Check that the token program provided is not `Tokenkeg...`, useful when using extensions */
function programSupportsExtensions(programId) {
    if (programId === exports.TOKEN_PROGRAM_ID) {
        return false;
    }
    else {
        return true;
    }
}
let [pda, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("native-mint")], exports.TOKEN_2022_PROGRAM_ID);
//# sourceMappingURL=constants.js.map