import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";

/**
 * Processor for formatting text for Discord
 * 
 * Converts custom tags to Discord's markdown-like formatting
 * 
 * @class DiscordProcessor
 * @implements {TagProcessor}
 */
export class DiscordProcessor implements TagProcessor {
  WHITELIST_TAG = "discord";

  start(text: string): string {
    return text;
  }

  /**
   * Converts a tag to Discord formatting
   * 
   * @param {ProcessTagInput} tag - Tag to process
   * @returns {string} Discord-formatted text
   */
  process(tag: ProcessTagInput): string {
    switch (tag.tag) {
      case SupportedTags.BOLD:    return `**${tag.content}**`;
      case SupportedTags.ITALIC:  return `_${tag.content}_`;
      case SupportedTags.QUOTE:   return `> ${tag.content}`;
      case SupportedTags.SPOILER: return `||${tag.content}||`;
      case SupportedTags.LINK:    return `[${tag.content}](${tag.params[0]})`;
      case SupportedTags.CODE:    return `\`\`\`${tag.content}\`\`\``;
      case SupportedTags.MONOSPACE: return `\`${tag.content}\``;
      default: return tag.content;
    }
  }

  finalize(text: string): string {
    return text;
  }
}