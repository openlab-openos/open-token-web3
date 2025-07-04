import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID } from '../constants.js';
import { createInitializeMint2Instruction } from '../instructions/initializeMint2.js';
import { getMinimumBalanceForRentExemptMint, MINT_SIZE } from '../state/mint.js';
/**
 * Create and initialize a new mint
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction and initialization fees
 * @param mintAuthority   Account or multisig that will control minting
 * @param freezeAuthority Optional account or multisig that can freeze token accounts
 * @param decimals        Location of the decimal place
 * @param keypair         Optional keypair, defaulting to a new random one
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Address of the new mint
 */
export async function createMint(connection, payer, mintAuthority, freezeAuthority, decimals, keypair = Keypair.generate(), confirmOptions, programId = TOKEN_2022_PROGRAM_ID) {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const transaction = new Transaction().add(SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId,
    }), createInitializeMint2Instruction(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId));
    await sendAndConfirmTransaction(connection, transaction, [payer, keypair], confirmOptions);
    return keypair.publicKey;
}
//# sourceMappingURL=createMint.js.map