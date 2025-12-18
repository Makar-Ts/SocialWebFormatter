import { process } from "./main";
import { DiscordProcessor } from "./processors/discord.processor";
import { TelegramProcessor } from "./processors/telegram.processor";
import { VKProcessor } from "./processors/vk.processor";

export function test() {
  const input = `
<b>bold</b>
<i>italic</i>
<quote>quote</quote>
<spoiler>spoiler</spoiler>
<link http://aaa.com>link</link>
<code>code</code>
<ms>monospace</ms>

<b><i>bold-italic</i></b>
<only tg>
only for telegram post</only><only vk>
only for vk post</only><only discord>
only for discord post</only>

<only discord tg><quote><i>for discord or tg post</i></quote></only>
`

  console.log(
    input,
    "\n----- telegram\n",
    process(input, new TelegramProcessor()),
    "\n----- discord\n",
    process(input, new DiscordProcessor()),
    "\n----- vk\n",
    process(input, new VKProcessor())
  )
}
