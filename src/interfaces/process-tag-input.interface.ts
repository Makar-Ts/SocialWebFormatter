import SupportedTags from "../constant/supported-tags.constant";

/**
 * Interface representing input data for tag processing
 */
export default interface ProcessTagInput {
  /**
   * The tag being processed
   * @type {SupportedTags}
   */
  tag: SupportedTags;

  /**
   * Array of tag parameters (e.g., URL for link tag)
   */
  params: string[];

  /**
   * Content inside the tag
   */
  content: string;
}