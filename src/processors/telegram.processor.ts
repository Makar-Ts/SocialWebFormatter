import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";

/**
 * Processor for formatting text for Telegram
 * 
 * Converts custom tags to Telegram's markdown formatting
 * 
 * @class TelegramProcessor
 * @implements {TagProcessor}
 */
export class TelegramProcessor implements TagProcessor {
  WHITELIST_TAG = "tg";

  start(text: string): string {
    return text;
  }

  /**
   * Converts a tag to Telegram formatting
   * 
   * @param {ProcessTagInput} tag - Tag to process
   * @returns {string} Telegram-formatted text
   */
  process(tag: ProcessTagInput): string {
    switch (tag.tag) {
      case SupportedTags.BOLD:    return `**${tag.content}**`;
      case SupportedTags.ITALIC:  return `__${tag.content}__`;
      case SupportedTags.QUOTE:   return `> ${tag.content}`;
      case SupportedTags.SPOILER: return `||${tag.content}||`;
      case SupportedTags.LINK:    return `(${tag.content})[${tag.params[0]}]`;
      case SupportedTags.CODE:    return `\`\`\`${tag.content}\`\`\``;
      case SupportedTags.MONOSPACE: return `\`${tag.content}\``;
      default: return tag.content;
    }
  }

  finalize(text: string): string {
    return text;
  }
}