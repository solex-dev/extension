<script lang="ts">
  import { onMount } from "svelte";

  let isInSolex = false; // push a message from extension to update the state

  const askIfInSolex = () => {
    tsvscode.postMessage({
      type: "ask",
      value: "askIfInSolex",
    });
  };
  onMount(() => {
    // to-do: check whether the workspace is solex or not
    askIfInSolex();

    window.addEventListener("message", async (event) => {
      console.log(event);
      const message = event.data;

      switch (message.command) {
        case "isInSolex":
          isInSolex = message.data.isInSolex;
          break;
        default:
          break;
      }
    });
  });
</script>

<div>
  {#if !isInSolex}
    <button>Download Exercises</button>
    <p class="welcome-tooltip">
      To get started, click the button above to download the exercises.
    </p>
  {:else}
    <button>Open Docs</button>
  {/if}
</div>
<hr />

<style>
  * {
    font-family: "Inter", sans-serif;
  }
  div {
    padding: 5%;
    padding-bottom: 0%;
  }

  button {
    border: none;
    border-radius: 5px;
    padding: 3.5%;
  }

  hr {
    height: 0.5px;
    width: 100%;
    border: 0.5px solid #696868;
  }

  .welcome-tooltip {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
</style>
