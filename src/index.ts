/**
 * SocialWebFormatter - A library for converting custom HTML-like tags
 * into platform-specific formatting for social networks.
 * 
 * @packageDocumentation
 */

export type { TagProcessor } from './interfaces/tag-processor.interface';
export { process } from './main';

export { TelegramProcessor } from './processors/telegram.processor';
export { VKProcessor } from './processors/vk.processor';
export { DiscordProcessor } from './processors/discord.processor';

export { test } from './test';