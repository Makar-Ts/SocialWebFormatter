import process from "./main";
import { TelegramProcessor } from "./processors/telegram.processor";

export function test() {
  const input = `
<b>bold</b>
<i>italic</i>
<q>quote</q>
<spoiler>spoiler</spoiler>
<link http://aaa.com>link</link>
<code>code</code>
<ms>monospace</ms>

<b><i>bold-italic</i></b>

<only tg>only for telegram post</only>
<only vk>only for vk post</only>
<only discord>only for discord post</only>

<only discord tg>for discord or tg post</only>
`

  console.log(
    input,
    "\n-----\n",
    process(input, new TelegramProcessor())
  )
}
