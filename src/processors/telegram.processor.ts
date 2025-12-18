import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";


export class TelegramProcessor implements TagProcessor {
  WHITELIST_TAG = "tg";

  start(text: string): string {
    return text;
  }

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