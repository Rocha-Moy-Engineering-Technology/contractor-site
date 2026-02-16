<script lang="ts">
  import profilePic from '../../pic.png';
  import { PROFILE, EDUCATION_ENTRIES } from '../types/resume';

  const currentYear = new Date().getFullYear();
</script>

<aside
  class="bg-bg-surface lg:sticky lg:top-0 lg:h-screen lg:w-2/5 lg:overflow-y-auto"
>
  <div class="flex flex-col items-center px-8 py-12 lg:px-10 lg:py-16">
    <img
      src={profilePic}
      alt={PROFILE.name}
      class="mb-6 h-52 w-52 rounded-2xl object-contain lg:h-72 lg:w-72"
    />

    <h1
      class="text-text-primary mb-1 text-center text-3xl font-bold lg:text-4xl"
    >
      {PROFILE.name}
    </h1>

    <div class="mt-6 space-y-3">
      {#each EDUCATION_ENTRIES as entry (entry.degree)}
        <div>
          <p class="text-text-primary text-sm font-medium">{entry.degree}</p>
          <p class="text-accent text-xs">{entry.institution}</p>
          <p class="text-text-secondary text-xs">{entry.dates}</p>
        </div>
      {/each}
    </div>

    <p class="text-text-secondary mt-10 text-xs">
      &copy; {currentYear} {PROFILE.name}
    </p>
  </div>
</aside>
