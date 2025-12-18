import SupportedTags from "../constant/supported-tags.constant";

export default interface ProcessTagInput {
  tag: SupportedTags;
  params: string[];
  content: string;
}