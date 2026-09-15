import { describe, expect, it } from 'vitest';
import { extractNarrativeParagraphs } from './narrative';

describe('extractNarrativeParagraphs', () => {
    it('splits a story block into blank-line-delimited paragraphs', () => {
        const raw = [
            '[- story',
            'Grandma always said the secret ingredient',
            'was patience, not the extra clove of garlic.',
            '',
            'This curry started as a way to use up a',
            'sad, lonely cauliflower.',
            '-]',
            '',
            '>> servings: 4',
        ].join('\n');

        expect(extractNarrativeParagraphs(raw)).toEqual([
            'Grandma always said the secret ingredient was patience, not the extra clove of garlic.',
            'This curry started as a way to use up a sad, lonely cauliflower.',
        ]);
    });

    it('returns an empty array when there is no story block', () => {
        const raw = '>> servings: 4\n\nFry the @onion{1} in a #pan.';
        expect(extractNarrativeParagraphs(raw)).toEqual([]);
    });

    it('ignores ordinary comments that are not tagged "story"', () => {
        const raw = '[- just a regular comment -]\n\nFry the @onion{1}.';
        expect(extractNarrativeParagraphs(raw)).toEqual([]);
    });

    it('is case-insensitive and tolerates an optional colon after the keyword', () => {
        const raw = '[- Story: A tale. -]';
        expect(extractNarrativeParagraphs(raw)).toEqual(['A tale.']);
    });

    it('does not match a word that merely starts with "story"', () => {
        const raw = '[- storyline notes go here -]';
        expect(extractNarrativeParagraphs(raw)).toEqual([]);
    });

    it('concatenates paragraphs from multiple story blocks in document order', () => {
        const raw = [
            '[- story',
            'First block.',
            '-]',
            '',
            '>> servings: 4',
            '',
            '[- story',
            'Second block.',
            '-]',
        ].join('\n');

        expect(extractNarrativeParagraphs(raw)).toEqual(['First block.', 'Second block.']);
    });

    it('normalizes internal whitespace within a paragraph', () => {
        const raw = '[- story\n  Line one   has   extra   space.\n  Line two continues.\n-]';
        expect(extractNarrativeParagraphs(raw)).toEqual(['Line one has extra space. Line two continues.']);
    });
});
