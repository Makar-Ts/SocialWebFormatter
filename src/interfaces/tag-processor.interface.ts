import ProcessTagInput from "./process-tag-input.interface";

/**
 * Interface defining the contract for tag processors
 */
export interface TagProcessor {
  /**
   * Platform identifier for <only> tag filtering
   */
  WHITELIST_TAG: string;

  /**
   * Pre-processes the entire text before tag parsing
   * @param {string} text - Input text
   * @returns {string} Pre-processed text
   */
  start(text: string): string;

  /**
   * Processes an individual tag
   * @param {ProcessTagInput} tag - Tag input data
   * @returns {string} Processed tag content
   */
  process(tag: ProcessTagInput): string;

  /**
   * Post-processes the entire text after all tags are processed
   * @param {string} text - Processed text
   * @returns {string} Final text
   */
  finalize(text: string): string;
}