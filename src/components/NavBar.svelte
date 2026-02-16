<script lang="ts">
  import { NAV_LINKS } from '../types/navigation';

  function handleClick(event: MouseEvent, sectionId: string): void {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<nav
  class="bg-bg-surface/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm"
>
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <span class="text-text-primary text-xl font-bold">PHR Moy</span>
    <div class="flex gap-6">
      {#each NAV_LINKS as link (link.sectionId)}
        <a
          href={`#${link.sectionId}`}
          class="text-text-secondary hover:text-accent transition-colors duration-200"
          onclick={(e: MouseEvent) => handleClick(e, link.sectionId)}
        >
          {link.label}
        </a>
      {/each}
    </div>
  </div>
</nav>
