<script>
  import "../styles/app.postcss";
  import RSVPForm from "$lib/parts/rsvpForm.svelte";
  import Clerk from "$lib/clerk/index.svelte";

  const people = {
    adults: [
      {
        name: "Bec",
      },
      {
        name: "Wilson",
      },
    ],
    children: [
      {
        name: "Peter",
      },
      {
        name: "Clair",
      },
    ],
  };
</script>

<main>
  <Clerk />
  <header>
    <h1>Dan and Amy are getting married!</h1>
  </header>
  <RSVPForm {people} />
  <slot />
</main>

<style lang="postcss">
</style>
