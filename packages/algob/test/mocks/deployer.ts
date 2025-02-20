import { types as rtypes } from "@algo-builder/runtime";
import { types as wtypes } from "@algo-builder/web";
import algosdk, { LogicSigAccount, modelsv2 } from "algosdk";

import type {
  ASCCache,
  ConfirmedTxInfo,
  Deployer,
  FundASCFlags,
  LogicSig,
  LsigInfo,
  SCParams
} from "../../src/types";

export class FakeDeployer implements Deployer {
  asa = new Map<string, rtypes. ASAInfo>();
  ssc = new Map<string, rtypes.SSCInfo>();
  lsig = new Map<string, LsigInfo>();
  isDeployMode = false;
  accounts = [];
  accountsByName = new Map<string, rtypes.Account>();
  scriptName = '';
  checkpoint = {
    getAppfromCPKey (key: string): rtypes.SSCInfo | undefined {
      throw new Error("Not implemented");
    },

    getAppCheckpointKeyFromIndex (index: number): string | undefined {
      throw new Error("Not implemented");
    },

    getAssetCheckpointKeyFromIndex (index: number): string | undefined {
      throw new Error("Not implemented");
    },

    getLatestTimestampValue (map: Map<number, rtypes.SSCInfo>): number {
      throw new Error("Not implemented");
    }
  };

  assertNoAsset (name: string): void {
    throw new Error("Not implemented");
  }

  getASAInfo (name: string): rtypes.ASAInfo {
    throw new Error("Not implemented");
  }

  getASADef (name: string): wtypes.ASADef {
    throw new Error("Not implemented");
  }

  persistCP (): void {
    throw new Error("Not implemented");
  }

  logTx (message: string, txConfirmation: ConfirmedTxInfo): void {
    throw new Error("Not implemented");
  }

  sendAndWait (rawTxns: Uint8Array | Uint8Array[]): Promise<ConfirmedTxInfo> {
    throw new Error("Not implemented");
  }

  registerASAInfo (name: string, asaInfo: rtypes.ASAInfo): void {
    throw new Error("Not implemented");
  }

  registerSSCInfo (name: string, sscInfo: rtypes.SSCInfo): void {
    throw new Error("Not implemented");
  }

  setScriptName (name: string): void {
    this.scriptName = name;
  }

  log (msg: string, obj: any): void {
    throw new Error("Not implemented");
  }

  getApp (nameApproval: string, nameClear: string): rtypes.SSCInfo | undefined {
    throw new Error("Not implemented");
  }

  getAppByName (appName: string): rtypes.SSCInfo | undefined {
    throw new Error("Not implemented");
  }

  getAppfromCPKey (key: string): rtypes.SSCInfo | undefined {
    throw new Error("Not implemented");
  }

  getAppCheckpointKeyFromIndex (index: number): string | undefined {
    throw new Error("Not implemented");
  }

  getAssetCheckpointKeyFromIndex (index: number): string | undefined {
    throw new Error("Not implemented");
  }

  getDelegatedLsig (lsig: string): object | undefined {
    throw new Error("Not implemented");
  }

  async loadLogic (name: string, scInitParam?: unknown): Promise<LogicSigAccount> {
    throw new Error("Not implemented");
  }

  loadMultiSig (name: string): Promise<LogicSig> {
    throw new Error("Not implemented");
  }

  addCheckpointKV (key: string, value: string): void {
  };

  getCheckpointKV (key: string): string | undefined {
    return "metadata";
  };

  async deployASA (name: string, flags: rtypes.ASADeploymentFlags): Promise<rtypes.ASAInfo> {
    throw new Error("Not implemented");
  };

  async deployASADef (
    name: string,
    asaDef: wtypes.ASADef,
    flags: rtypes.ASADeploymentFlags
  ): Promise<rtypes.ASAInfo> {
    throw new Error("Not implemented");
  }

  loadASADef (asaName: string): wtypes.ASADef | undefined {
    throw new Error("Not implemented");
  }

  async fundLsig (name: string, flags: FundASCFlags,
    payFlags: wtypes.TxParams, scInitParam?: unknown): Promise<void> {
    throw new Error("Not implemented");
  }

  async mkDelegatedLsig (name: string, signer: rtypes.Account,
    scInitParam?: unknown): Promise<LsigInfo> {
    throw new Error("Not implemented");
  }

  async deployApp (
    approvalProgram: string,
    clearProgram: string,
    flags: rtypes.AppDeploymentFlags,
    payFlags: wtypes.TxParams,
    scInitParam?: unknown,
    appName?: string): Promise<rtypes.SSCInfo> {
    throw new Error("Not implemented");
  }

  async updateApp (
    sender: algosdk.Account,
    payFlags: wtypes.TxParams,
    appID: number,
    newApprovalProgram: string,
    newClearProgram: string,
    flags: rtypes.AppOptionalFlags,
    scTmplParams?: SCParams,
    appName?: string
  ): Promise<rtypes.SSCInfo> {
    throw new Error("Not implemented");
  }

  async ensureCompiled (name: string, force?: boolean, scInitParam?: unknown): Promise<ASCCache> {
    throw new Error("Not implemented");
  }

  assertCPNotDeleted (execParams: wtypes.ExecParams | wtypes.ExecParams[]): void {
    throw new Error("Not implemented");
  }

  isDefined (name: string): boolean {
    return false;
  };

  get algodClient (): algosdk.Algodv2 {
    throw new Error("Not implemented");
  };

  getAssetByID (assetIndex: number | bigint): Promise<modelsv2.Asset> {
    throw new Error("Not implemented");
  }

  waitForConfirmation (txId: string): Promise<ConfirmedTxInfo> {
    throw new Error("Not implemented");
  }

  optInAccountToASA (asa: string, accountName: string, flags: wtypes.TxParams): Promise<void> {
    throw new Error("Not implemented");
  }

  optInLsigToASA (asa: string, lsig: LogicSigAccount, flags: wtypes.TxParams): Promise<void> {
    throw new Error("Not implemented");
  }

  optInAccountToApp (
    sender: rtypes.Account, index: number, payFlags: wtypes.TxParams,
    flags: rtypes.AppOptionalFlags): Promise<void> {
    throw new Error("Not implemented");
  }

  optInLsigToApp (
    appID: number, lsig: LogicSigAccount,
    payFlags: wtypes.TxParams, flags: rtypes.AppOptionalFlags): Promise<void> {
    throw new Error("not implemented.");
  }
}
