<script lang="ts">
    import type { RecipeRenderModel } from '../types';

    let { model }: { model: RecipeRenderModel } = $props();
    let visible = $derived(model.narrative.slice(0, 2));
    let rest = $derived(model.narrative.slice(2));
</script>

{#if model.settings.showNarrative && visible.length}
    <section class="cook-narrative" aria-label="Recipe story">
        {#each visible as paragraph}
            <p class="cook-narrative-p">{paragraph}</p>
        {/each}
        {#if rest.length}
            <details class="cook-narrative-details">
                <summary class="cook-narrative-summary">
                    <span class="cook-narrative-disclosure-icon" aria-hidden="true"></span>
                    {model.settings.narrativeLabel || 'Continue reading'}
                </summary>
                {#each rest as paragraph}
                    <p class="cook-narrative-p">{paragraph}</p>
                {/each}
            </details>
        {/if}
    </section>
{/if}
