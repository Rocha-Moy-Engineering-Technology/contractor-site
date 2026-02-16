<script lang="ts">
  import { ModalState } from './types/modal';
  import NavBar from './components/NavBar.svelte';
  import ProfileColumn from './components/ProfileColumn.svelte';
  import ExperienceColumn from './components/ExperienceColumn.svelte';
  import ContactModal from './components/ContactModal.svelte';

  let modalState = $state<ModalState>(ModalState.Closed);

  function openContact(): void {
    modalState = ModalState.Open;
  }

  function closeContact(): void {
    modalState = ModalState.Closed;
  }
</script>

<NavBar oncontact={openContact} />
<main class="flex flex-col lg:flex-row">
  <ProfileColumn />
  <ExperienceColumn />
</main>
<ContactModal state={modalState} onclose={closeContact} />
