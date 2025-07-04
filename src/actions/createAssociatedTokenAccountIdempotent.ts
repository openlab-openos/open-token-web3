import type { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../constants.js';
import { createAssociatedTokenAccountIdempotentInstruction } from '../instructions/associatedTokenAccount.js';
import { getAssociatedTokenAddressSync } from '../state/mint.js';

/**
 * Create and initialize a new associated token account
 * The instruction will succeed even if the associated token account already exists
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param mint                     Mint for the account
 * @param owner                    Owner of the new account
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the new or existing associated token account
 */
export async function createAssociatedTokenAccountIdempotent(
    connection: Connection,
    payer: Signer,
    mint: PublicKey,
    owner: PublicKey,
    confirmOptions?: ConfirmOptions,
    programId = TOKEN_2022_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Promise<PublicKey> {
    const associatedToken = getAssociatedTokenAddressSync(mint, owner, false, programId, associatedTokenProgramId);

    const transaction = new Transaction().add(
        createAssociatedTokenAccountIdempotentInstruction(
            payer.publicKey,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId
        )
    );

    await sendAndConfirmTransaction(connection, transaction, [payer], confirmOptions);

    return associatedToken;
}
