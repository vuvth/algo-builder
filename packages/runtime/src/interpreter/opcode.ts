/* eslint sonarjs/no-identical-functions: 0 */
import { RUNTIME_ERRORS } from "../errors/errors-list";
import { RuntimeError } from "../errors/runtime-errors";
import { GlobalFields, ITxArrFields, ITxnFields, MAX_UINT6, MAX_UINT8, MAX_UINT64, MAX_UINT128, MIN_UINT8, MIN_UINT64, TxArrFields, TxnFields } from "../lib/constants";
import type { TEALStack } from "../types";

export class Op {
  /**
   * assert stack length is atleast minLen
   * @param stack TEAL stack
   * @param minLen length to check from
   * @param line line number in TEAL file
   */
  assertMinStackLen (stack: TEALStack, minLen: number, line: number): void {
    if (stack.length() < minLen) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.ASSERT_STACK_LENGTH, { line: line });
    }
  }

  /**
   * asserts number is less than or equal to value(MAX_UINT64, MAX_UINT128)
   * @param num number to check
   * @param line line number in TEAL file
   * @param value max value
   */
  checkOverflow (num: bigint, line: number, value: bigint): void {
    switch (value) {
      case MAX_UINT64: {
        if (num > MAX_UINT64) {
          throw new RuntimeError(RUNTIME_ERRORS.TEAL.UINT64_OVERFLOW, { line: line });
        }
        break;
      }
      case MAX_UINT128: {
        if (num > MAX_UINT128) {
          throw new RuntimeError(RUNTIME_ERRORS.TEAL.UINT128_OVERFLOW, { line: line });
        }
        break;
      }
    }
  }

  /**
   * asserts number is greater than MIN_UINT64 (0n)
   * @param num number to check
   * @param line line number in TEAL file
   */
  checkUnderflow (num: bigint, line: number): void {
    if (num < MIN_UINT64) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.UINT64_UNDERFLOW, { line: line });
    }
  }

  /**
   * asserts if index exist in given array
   * @param idx index number
   * @param arr array to check from
   * @param line line number in TEAL file
   */
  checkIndexBound (idx: number, arr: any[], line: number): void {
    if (!(idx >= 0 && idx < arr.length)) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INDEX_OUT_OF_BOUND, { line: line });
    }
  }

  /**
   * asserts if array length is less than equal to MAX_UINT8 (255) and not equal to 0
   * @param arr array
   * @param line line number in TEAL file
   */
  assertArrLength (arr: Uint8Array[] | BigInt[], line: number): void {
    if (!arr.length || arr.length > MAX_UINT8 + 1) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.ASSERT_ARR_LENGTH, { line: line });
    }
  }

  /**
   * asserts if given variable type is bigint
   * @param a variable
   * @param line line number in TEAL file
   */
  assertBigInt (a: unknown, line: number): bigint {
    if (typeof a === "undefined" || typeof a !== "bigint") {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_TYPE, {
        expected: "uint64",
        actual: typeof a,
        line: line
      });
    }
    return a;
  }

  assertUInt8 (a: unknown, line: number): number {
    if (typeof a === "undefined" || typeof a !== "bigint") {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_TYPE, {
        expected: "uint64",
        actual: typeof a,
        line: line
      });
    }
    if (a >= 2 << 7) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_TYPE, {
        expected: "uint8 {0..255}",
        actual: a,
        line: line
      });
    }

    return Number(a);
  }

  /**
   * asserts if given variable type is bytes
   * @param b variable
   * @param line line number in TEAL file
   * @param maxlen maximum allowed length of bytes
   */
  assertBytes (b: unknown, line: number, maxlen?: number): Uint8Array {
    if (typeof b === 'undefined' || !(b instanceof Uint8Array)) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_TYPE, {
        expected: "byte[]",
        actual: typeof b,
        line: line
      });
    }
    if (maxlen !== undefined && b.length > maxlen) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.BYTES_LEN_EXCEEDED, {
        len: b.length,
        expected: maxlen,
        line: line
      });
    }
    return b;
  }

  /**
   * asserts if given bigint is an 8 bit unsigned integer
   * @param a  value to assert (in bigint)
   * @param line line number in TEAL file
   */
  assertUint8 (a: bigint, line: number): bigint {
    if (a < MIN_UINT8 || a > MAX_UINT8) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_UINT8, { line: line });
    }
    return a;
  }

  /**
   * asserts if given index lies in 64 bit unsigned integer
   * @param index Index
   * @param line line number in TEAL file
   */
  assert64BitIndex (index: bigint, line: number): void {
    if (index > MAX_UINT6) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.SET_BIT_INDEX_ERROR,
        { index: index, line: line });
    }
  }

  /**
   * asserts if given index lies in bytes array
   * @param index Index
   * @param array bytes array
   * @param line line number in TEAL file
   */
  assertBytesIndex (index: number, array: Uint8Array, line: number): void {
    if (index >= array.length) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.SET_BIT_INDEX_BYTES_ERROR,
        { index: index, line: line });
    }
  }

  /**
   * Returns substring from given string (if it exists)
   * @param byteString given string as bytes
   * @param start starting index
   * @param end ending index
   * @param line line number in TEAL file
   */
  subString (byteString: Uint8Array, start: bigint, end: bigint, line: number): Uint8Array {
    if (end < start) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.SUBSTRING_END_BEFORE_START, { line: line });
    }
    if (start > byteString.length || end > byteString.length) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.SUBSTRING_RANGE_BEYOND, { line: line });
    }

    return byteString.slice(Number(start), Number(end));
  }

  /**
   * asserts if known transaction field is passed
   * @param str transaction field
   * @param tealVersion version of TEAL
   * @param line line number in TEAL file
   */
  assertTxFieldDefined (str: string, tealVersion: number, line: number): void {
    if (TxnFields[tealVersion][str] === undefined) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.UNKNOWN_TRANSACTION_FIELD,
        { field: str, version: tealVersion, line: line });
    }
  }

  /**
   * asserts if known transaction field of type array is passed
   * @param str transaction field
   * @param tealVersion version of TEAL
   * @param line line number in TEAL file
   */
  assertTxArrFieldDefined (str: string, tealVersion: number, line: number): void {
    if (!TxArrFields[tealVersion].has(str)) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_OP_ARG,
        { opcode: str, version: tealVersion, line: line });
    }
  }

  /**
   * asserts if known itxn field is passed
   * @param str itxn field
   * @param tealVersion version of TEAL
   * @param line line number in TEAL file
   */
  assertITxFieldDefined (str: string, tealVersion: number, line: number): void {
    if (TxnFields[tealVersion][str] === undefined && ITxnFields[tealVersion][str] === undefined) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.UNKNOWN_TRANSACTION_FIELD,
        { field: str, version: tealVersion, line: line });
    }
  }

  /**
   * asserts if known itxn field of type array is passed
   * @param str itxn field
   * @param tealVersion version of TEAL
   * @param line line number in TEAL file
   */
  assertITxArrFieldDefined (str: string, tealVersion: number, line: number): void {
    if (!TxArrFields[tealVersion].has(str) && !ITxArrFields[tealVersion].has(str)) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.INVALID_OP_ARG,
        { opcode: str, version: tealVersion, line: line });
    }
  }

  /**
   * asserts if known global field is passed
   * @param str global field
   * @param tealVersion version of TEAL
   * @param line line number in TEAL file
   */
  assertGlobalDefined (str: string, tealVersion: number, line: number): void {
    if (GlobalFields[tealVersion][str] === undefined) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.UNKNOWN_GLOBAL_FIELD,
        { field: str, version: tealVersion, line: line });
    }
  }

  /**
   * Push 1n if boolean is true else push 0n. Returns TEAL stack
   * @param stack TEAL stack
   * @param ok boolean
   */
  pushBooleanCheck (stack: TEALStack, ok: boolean): TEALStack {
    if (ok) {
      stack.push(1n);
    } else {
      stack.push(0n);
    }
    return stack;
  }

  /**
   * Returns range of bytes from A starting at S up to but not including S+L,
   * If S or S+L is larger than the array length, throw error
   * @param array Uint8array
   * @param start starting point in array
   * @param length length of substring
   */
  opExtractImpl (array: Uint8Array, start: number, length: number): Uint8Array {
    const end = start + length;
    if (start > array.length) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.EXTRACT_RANGE_ERROR, { given: start, length: array.length });
    }
    if (end > array.length) {
      throw new RuntimeError(RUNTIME_ERRORS.TEAL.EXTRACT_RANGE_ERROR, { given: end, length: array.length });
    }

    return array.slice(start, end);
  }
}
