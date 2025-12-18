import { TagProcessor } from "./interfaces/tag-processor.interface";

/**
 * Parses and processes custom HTML-like tags in text using the provided processor
 * 
 * @param {string} text - Input text containing custom tags
 * @param {TagProcessor} processor - Platform-specific tag processor
 * @returns {string} Text with tags converted to platform-specific formatting
 * 
 * @example
 * ```typescript
 * const result = process("<b>bold</b> text", new DiscordProcessor());
 * // result: "**bold** text"
 * ```
 */
export function process(text: string, processor: TagProcessor) {
  text = processor.start(text);

  let content = "";
  let ongoingParam = "";

  const currentTags: any[] = [];

  let state: string = "text";
  let closingTag: boolean = false;
  let shielded: boolean = false;
  for (let s of text) {
    const current = currentTags.at(-1);

    switch (state) {
      case "text":
        if (!shielded) {
          if (s === "\\") {
            shielded = true;
            break;
          }

          if (s === "<") {
            state = "tagBrackets";
            break;
          }
        } else {
          shielded = false;
        }

        if (current) {
          current.content += s;
        } else {  
          content += s;
        }
        break;
      case "tagBrackets":
        if (s === "/") {
          closingTag = true;
          state = "tagName";
          break;
        }

        closingTag = false;
        currentTags.push({
          tag: s,
          params: [],
          content: '',
        })
        state = "tagName";
        break;
      case "tagName":
        if (s === " ") {
          state = "tagParams";
          ongoingParam = "";
          break;
        } else if (s === ">") {
          if (closingTag) {
            let proc = "";

            if (current.tag === "only") {
              if (current.params.includes(processor.WHITELIST_TAG)) {
                proc = current.content;
              }
            } else {
              proc = processor.process(current);
            }
            
            const last = currentTags.at(-2);
            currentTags.pop();

            if (last) {
              last.content += proc;
              state = "text";
              break;
            }

            content += proc;
            state = "text";
            break;
          }

          state = "text";
          break;
        }

        if (!closingTag) current.tag += s;
        break;
      case "tagParams":
        if (s === " ") {
          if (ongoingParam !== "") {
            current.params.push(ongoingParam);
            ongoingParam = "";
          }
          break;
        } else if (s === ">") {
          if (ongoingParam !== "") 
            current.params.push(ongoingParam);
          
          current.params = current.params
            .map((r: string) => r.trim())
            .filter((r: string) => r !== "");

          if (closingTag) {
            const last = currentTags.at(-2);
            const proc = processor.process(current);

            currentTags.pop();

            if (last) {
              last.content += proc;
              state = "text";
              break;
            }

            content += proc;
            state = "text";
            break;
          }

          state = "text";
          break;
        }

        ongoingParam += s;
        break;
      default:
        state = "text";
        break;
    }
  }

  return processor.finalize(content);
}