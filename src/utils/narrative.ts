/**
 * Story blocks reuse real Cooklang block-comment syntax ([- ... -]) tagged
 * with a leading "story" keyword, so any other Cooklang tool that doesn't
 * know about this convention still sees an ordinary, harmless comment.
 */
const STORY_BLOCK = /\[-\s*story\b:?\s*([\s\S]*?)-\]/gi;

/** Extract whimsical narrative/story paragraphs from a raw .cook file. */
export function extractNarrativeParagraphs(rawText: string): string[] {
    const normalized = rawText.replace(/\r\n/g, '\n');
    const paragraphs: string[] = [];

    for (const match of normalized.matchAll(STORY_BLOCK)) {
        const block = match[1] ?? '';
        for (const rawParagraph of block.split(/\n\s*\n/)) {
            const paragraph = rawParagraph.replace(/\s+/g, ' ').trim();
            if (paragraph) paragraphs.push(paragraph);
        }
    }

    return paragraphs;
}
