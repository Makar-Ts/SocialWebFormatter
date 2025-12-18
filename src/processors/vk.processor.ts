import SupportedTags from "../constant/supported-tags.constant";
import ProcessTagInput from "../interfaces/process-tag-input.interface";
import { TagProcessor } from "../interfaces/tag-processor.interface";


export class VKProcessor implements TagProcessor {
  WHITELIST_TAG = "vk";

  start(text: string): string {
    return text;
  }

  process(tag: ProcessTagInput): string {
    //vk doesn't support any formatting in community's posts
    
    return tag.content;
  }

  finalize(text: string): string {
    return text;
  }
}