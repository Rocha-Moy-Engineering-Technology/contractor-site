<script lang="ts">
  import { SectionId } from '../types/navigation';
  import { PROFILE } from '../types/resume';
  import profilePic from '../../pic.png';
</script>

<section
  id={SectionId.Hero}
  class="bg-bg-primary flex flex-col items-center px-6 py-20 text-center"
>
  <img
    src={profilePic}
    alt={PROFILE.name}
    class="border-accent/30 mb-8 h-40 w-40 rounded-full border-4 object-cover shadow-lg"
  />
  <h1 class="text-text-primary mb-2 text-4xl font-bold md:text-5xl">
    {PROFILE.name}
  </h1>
  <p class="text-accent mb-6 text-xl md:text-2xl">
    {PROFILE.title}
  </p>
  <p class="text-text-secondary mb-8 max-w-2xl text-lg">
    {PROFILE.summary}
  </p>
  <div class="flex gap-4">
    <a
      href={PROFILE.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      class="bg-bg-card text-text-secondary hover:text-accent hover:border-accent border-border rounded-lg border px-5 py-2.5 transition-colors duration-200"
    >
      GitHub
    </a>
    <a
      href={PROFILE.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      class="bg-bg-card text-text-secondary hover:text-accent hover:border-accent border-border rounded-lg border px-5 py-2.5 transition-colors duration-200"
    >
      LinkedIn
    </a>
  </div>
</section>
