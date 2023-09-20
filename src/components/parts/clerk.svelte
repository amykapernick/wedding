<script>
  import Clerk from "@clerk/clerk-js";

  onMount(async () => {
    const clerkAPI = process.env.CLERK_API;
    const clerk = new Clerk(clerkAPI);

    await clerk.load({});

    const signin = document.querySelector("#signin");

    clerk.mountSignIn(signin);
  });
</script>

<div id="signin" />
