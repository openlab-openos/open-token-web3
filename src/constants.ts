import { PublicKey } from '@solana/web3.js';

/** Address of the SPL Token program */
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

/** Address of the SPL Token 2022 program */
export const TOKEN_2022_PROGRAM_ID = new PublicKey('Token9ADbPtdFC3PjxaohBLGw2pgZwofdcbj6Lyaw6c');

/** Address of the SPL Associated Token Account program */
//export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('AtokenhZ6AE34VMYRv1AqSv8q8QZJxxEaY1zKiXKwSWT');

/** Address of the special mint for wrapped native SOL in spl-token */
export const NATIVE_MINT = new PublicKey('So11111111111111111111111111111111111111112');

/** Address of the special mint for wrapped native SOL in spl-token-2022 */
export const NATIVE_MINT_2022 = new PublicKey('B67JGY8hbUcNbpMufKJ4dF3egfbZuD4EkyffQ3cxZcUz');

/** Check that the token program provided is not `Tokenkeg...`, useful when using extensions */
export function programSupportsExtensions(programId: PublicKey): boolean {
    if (programId === TOKEN_PROGRAM_ID) {
        return false;
    } else {
        return true;
    }
}
let [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("native-mint")],
    TOKEN_2022_PROGRAM_ID,
  );
