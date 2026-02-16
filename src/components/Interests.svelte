<script lang="ts">
  import { SectionId } from '../types/navigation';
  import { INTERESTS } from '../types/interests';
</script>

<section id={SectionId.Interests} class="bg-bg-surface px-6 py-20">
  <div class="mx-auto max-w-6xl">
    <h2 class="text-text-primary mb-12 text-center text-3xl font-bold">
      Professional Interests
    </h2>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {#each INTERESTS as interest (interest.label)}
        <div
          class="bg-bg-card border-border hover:border-accent/50 rounded-xl border p-6 transition-colors duration-200"
        >
          <h3 class="text-accent mb-2 text-lg font-semibold">
            {interest.label}
          </h3>
          <p class="text-text-secondary text-sm">
            {interest.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
