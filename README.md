# SocialWebFormatter

A TypeScript library for converting custom HTML-like tags into platform-specific formatting for social networks (Discord, Telegram, VK).

## Features

- **Platform Support**: Convert tags to Discord, Telegram, and VK formatting
- **Custom Tags**: Use simple HTML-like tags for formatting
- **Platform-Specific Content**: Use `<only>` tags to show content only on specific platforms
- **TypeScript First**: Full TypeScript support with proper type definitions
- **Extensible**: Easy to add new processors for other platforms

## Installation

```bash
npm install social-web-formatter
```

## Supported Tags

| Tag | Description | Example |
|-----|-------------|---------|
| `<b>` | Bold text | `<b>bold text</b>` |
| `<i>` | Italic text | `<i>italic text</i>` |
| `<quote>` | Quoted text | `<quote>quoted text</quote>` |
| `<spoiler>` | Spoiler/hidden text | `<spoiler>spoiler text</spoiler>` |
| `<link>` | Hyperlink | `<link https://example.com>link text</link>` |
| `<code>` | Code block | `<code>code block</code>` |
| `<ms>` | Monospace text | `<ms>monospace text</ms>` |
| `<only>` | Platform-specific content | `<only discord>only on discord</only>` |

## Quick Start

```typescript
import { process, DiscordProcessor, TelegramProcessor, VKProcessor } from 'social-web-formatter';

const input = `
<b>bold text</b>
<i>italic text</i>
<only discord>only for discord</only>
<only tg>only for telegram</only>
`;

// Convert for Discord
const discordOutput = process(input, new DiscordProcessor());
console.log(discordOutput);
// Output: **bold text** _italic text_ only for discord

// Convert for Telegram
const telegramOutput = process(input, new TelegramProcessor());
console.log(telegramOutput);
// Output: **bold text** __italic text__ only for telegram

// Convert for VK
const vkOutput = process(input, new VKProcessor());
console.log(vkOutput);
// Output: bold text italic text only for telegram
```

## API

### Main Function

#### `process(text: string, processor: TagProcessor): string`
Processes the input text using the specified processor.

- `text`: Input text with custom tags
- `processor`: Platform processor (DiscordProcessor, TelegramProcessor, VKProcessor)
- Returns: Formatted text for the target platform

### Processors

- `DiscordProcessor`: Formats text for Discord
- `TelegramProcessor`: Formats text for Telegram
- `VKProcessor`: Formats text for VK (removes formatting)

### Creating Custom Processors

Implement the `TagProcessor` interface:

```typescript
import { TagProcessor } from 'social-web-formatter';

class MyCustomProcessor implements TagProcessor {
  WHITELIST_TAG = "myplatform";

  start(text: string): string {
    // Pre-process text if needed
    return text;
  }

  process(tag: ProcessTagInput): string {
    // Convert tags to platform-specific formatting
    switch (tag.tag) {
      case 'b': return `**${tag.content}**`;
      // ... handle other tags
      default: return tag.content;
    }
  }

  finalize(text: string): string {
    // Post-process text if needed
    return text;
  }
}
```

## Examples

### Complex Formatting

```typescript
const complexInput = `
<only discord tg>
<quote>
<i>This will appear in</i> <b>Discord and Telegram</b>
</quote>
</only>
<only vk>
This will only appear in VK
</only>
`;

const discordResult = process(complexInput, new DiscordProcessor());
// Result: > _This will appear in_ **Discord and Telegram**
```

### Links with Parameters

```typescript
const linkInput = `<link https://github.com/Makar-Ts/SocialWebFormatter>GitHub Repository</link>`;

const discordLink = process(linkInput, new DiscordProcessor());
// Result: [GitHub Repository](https://github.com/Makar-Ts/SocialWebFormatter)

const telegramLink = process(linkInput, new TelegramProcessor());
// Result: (GitHub Repository)[https://github.com/Makar-Ts/SocialWebFormatter]
```

## Development

### Building

```bash
npm run build
```

## License

MIT License - see LICENSE file for details.

## Author

Makar Ts - [GitHub](https://github.com/Makar-Ts)