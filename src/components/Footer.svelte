<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-bg-surface border-border border-t px-6 py-10 text-center">
  <a
    href="/resume.pdf"
    download
    class="bg-accent hover:bg-accent-hover mb-6 inline-block rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200"
  >
    Download Resume
  </a>
  <p class="text-text-secondary text-sm">
    &copy; {currentYear} Pedro Henrique Rocha Moy. All rights reserved.
  </p>
</footer>
