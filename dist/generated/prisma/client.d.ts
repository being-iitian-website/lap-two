import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more User_infos
 * const user_infos = await prisma.user_info.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User_info
 *
 */
export type User_info = Prisma.User_infoModel;
/**
 * Model Target
 *
 */
export type Target = Prisma.TargetModel;
/**
 * Model Revision
 *
 */
export type Revision = Prisma.RevisionModel;
/**
 * Model FocusSession
 *
 */
export type FocusSession = Prisma.FocusSessionModel;
/**
 * Model Journal
 *
 */
export type Journal = Prisma.JournalModel;
/**
 * Model VisionBoard
 *
 */
export type VisionBoard = Prisma.VisionBoardModel;
/**
 * Model VisionBoardItem
 *
 */
export type VisionBoardItem = Prisma.VisionBoardItemModel;
//# sourceMappingURL=client.d.ts.map