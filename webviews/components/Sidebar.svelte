<script lang="ts">
  import { onMount } from "svelte";
  import ExerciseCard from "./ExerciseCard.svelte";
  import SearchBar from "./SearchBar.svelte";
  let isInSolex = false; // push a message from extension to update the state
  let exercises: Array<{
    id: number;
    name: string;
    difficulty: "easy" | "moderate" | "hard";
    solved: boolean;
  }> = [];

  const askIfInSolex = () => {
    tsvscode.postMessage({
      type: "ask",
      value: "askIfInSolex",
    });
  };

  const getExercises = () => {
    tsvscode.postMessage({
      type: "ask",
      value: "getExercises",
    });
  };

  onMount(() => {
    // to-do: check whether the workspace is solex or not
    askIfInSolex();

    window.addEventListener("message", async (event) => {
      const message = event.data;

      switch (message.command) {
        case "isInSolex":
          isInSolex = message.data.isInSolex;
          getExercises();
          break;
        case "getExercises":
          exercises = message.data.exercises;
          break;
        default:
          break;
      }
    });
  });
</script>

<div>
  {#if !isInSolex}
    <div class="not-in-solex">
      <button>Download Exercises</button>
      <p class="welcome-tooltip">
        To get started, click the button above to download the exercises. If
        already downloaded, it will open the exercises.
      </p>
    </div>
  {:else}
    <SearchBar />
    <hr />
    {#each exercises as exercise (exercise.id)}
      <ExerciseCard
        id={exercise.id}
        title={exercise.name}
        difficulty={exercise.difficulty}
        solved={exercise.solved}
      />
    {/each}
  {/if}
</div>

<style>
  * {
    font-family: "Inter", sans-serif;
  }
  div {
    padding: 3%;
    padding-bottom: 2%;
  }

  button {
    border: none;
    border-radius: 3px;
    padding: 3.5%;
  }

  hr {
    height: 0.5px;
    width: 100%;
    border: 0.5px solid #696868;
    margin-bottom: 0%;
  }

  .welcome-tooltip {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .not-in-solex {
    margin: 0% 2%;
  }
</style>
