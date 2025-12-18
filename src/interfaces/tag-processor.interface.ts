import ProcessTagInput from "./process-tag-input.interface";

export interface TagProcessor {
  WHITELIST_TAG: string;

  start(text: string): string;

  process(tag: ProcessTagInput): string;

  finalize(text: string): string;
}