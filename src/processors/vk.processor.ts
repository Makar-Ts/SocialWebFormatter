import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";

/**
 * Processor for formatting text for VK (VKontakte)
 * 
 * Note: VK doesn't support rich formatting in community posts,
 * so this processor simply removes all tags and returns plain text
 * 
 * @class VKProcessor
 * @implements {TagProcessor}
 */
export class VKProcessor implements TagProcessor {
  WHITELIST_TAG = "vk";

  start(text: string): string {
    return text;
  }

  /**
   * Removes tags and returns plain text (VK doesn't support formatting)
   * 
   * @param {ProcessTagInput} tag - Tag to process
   * @returns {string} Plain text content
   */
  process(tag: ProcessTagInput): string {
    // VK doesn't support any formatting in community posts
    return tag.content;
  }

  finalize(text: string): string {
    return text;
  }
}