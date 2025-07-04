import type { ConfirmOptions, Connection, PublicKey, Signer, TransactionSignature } from '@solana/web3.js';
import { sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID } from '../constants.js';
import type { AuthorityType } from '../instructions/setAuthority.js';
import { createSetAuthorityInstruction } from '../instructions/setAuthority.js';
import { getSigners } from './internal.js';

/**
 * Assign a new authority to the account
 *
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param account          Address of the account
 * @param currentAuthority Current authority of the specified type
 * @param authorityType    Type of authority to set
 * @param newAuthority     New authority of the account
 * @param multiSigners     Signing accounts if `currentAuthority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */
export async function setAuthority(
    connection: Connection,
    payer: Signer,
    account: PublicKey,
    currentAuthority: Signer | PublicKey,
    authorityType: AuthorityType,
    newAuthority: PublicKey | null,
    multiSigners: Signer[] = [],
    confirmOptions?: ConfirmOptions,
    programId = TOKEN_2022_PROGRAM_ID
): Promise<TransactionSignature> {
    const [currentAuthorityPublicKey, signers] = getSigners(currentAuthority, multiSigners);

    const transaction = new Transaction().add(
        createSetAuthorityInstruction(
            account,
            currentAuthorityPublicKey,
            authorityType,
            newAuthority,
            multiSigners,
            programId
        )
    );

    return await sendAndConfirmTransaction(connection, transaction, [payer, ...signers], confirmOptions);
}
