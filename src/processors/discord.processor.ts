import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";


export class DiscordProcessor implements TagProcessor {
  WHITELIST_TAG = "discord";

  start(text: string): string {
    return text;
  }

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