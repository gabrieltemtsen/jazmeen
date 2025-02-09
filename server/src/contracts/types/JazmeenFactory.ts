/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common.js";

export declare namespace JazmeenFactory {
  export type TokenInfoStruct = {
    tokenAddress: AddressLike;
    name: string;
    symbol: string;
    imageUrl: string;
    creator: AddressLike;
  };

  export type TokenInfoStructOutput = [
    tokenAddress: string,
    name: string,
    symbol: string,
    imageUrl: string,
    creator: string,
  ] & {
    tokenAddress: string;
    name: string;
    symbol: string;
    imageUrl: string;
    creator: string;
  };
}

export interface JazmeenFactoryInterface extends Interface {
  getFunction(
    nameOrSignature: "deployToken" | "getTokens" | "jazmeenDeployer" | "tokens"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TokenDeployed"): EventFragment;

  encodeFunctionData(
    functionFragment: "deployToken",
    values: [string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "getTokens", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "jazmeenDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokens",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "jazmeenDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokens", data: BytesLike): Result;
}

export namespace TokenDeployedEvent {
  export type InputTuple = [
    creator: AddressLike,
    tokenAddress: AddressLike,
    name: string,
    symbol: string,
  ];
  export type OutputTuple = [
    creator: string,
    tokenAddress: string,
    name: string,
    symbol: string,
  ];
  export interface OutputObject {
    creator: string;
    tokenAddress: string;
    name: string;
    symbol: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface JazmeenFactory extends BaseContract {
  connect(runner?: ContractRunner | null): JazmeenFactory;
  waitForDeployment(): Promise<this>;

  interface: JazmeenFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  deployToken: TypedContractMethod<
    [
      name: string,
      symbol: string,
      initialSupply: BigNumberish,
      imageUrl: string,
    ],
    [void],
    "nonpayable"
  >;

  getTokens: TypedContractMethod<
    [],
    [JazmeenFactory.TokenInfoStructOutput[]],
    "view"
  >;

  jazmeenDeployer: TypedContractMethod<[], [string], "view">;

  tokens: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string] & {
        tokenAddress: string;
        name: string;
        symbol: string;
        imageUrl: string;
        creator: string;
      },
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deployToken"
  ): TypedContractMethod<
    [
      name: string,
      symbol: string,
      initialSupply: BigNumberish,
      imageUrl: string,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getTokens"
  ): TypedContractMethod<[], [JazmeenFactory.TokenInfoStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "jazmeenDeployer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "tokens"): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string] & {
        tokenAddress: string;
        name: string;
        symbol: string;
        imageUrl: string;
        creator: string;
      },
    ],
    "view"
  >;

  getEvent(
    key: "TokenDeployed"
  ): TypedContractEvent<
    TokenDeployedEvent.InputTuple,
    TokenDeployedEvent.OutputTuple,
    TokenDeployedEvent.OutputObject
  >;

  filters: {
    "TokenDeployed(address,address,string,string)": TypedContractEvent<
      TokenDeployedEvent.InputTuple,
      TokenDeployedEvent.OutputTuple,
      TokenDeployedEvent.OutputObject
    >;
    TokenDeployed: TypedContractEvent<
      TokenDeployedEvent.InputTuple,
      TokenDeployedEvent.OutputTuple,
      TokenDeployedEvent.OutputObject
    >;
  };
}
