<script lang="ts">
  export let title: string;
  export let difficulty: "easy" | "moderate" | "hard";
  export let solved: boolean = false;
  export let id: number;

  const openExercise = () => {
    tsvscode.postMessage({
      type: "open-exercise",
      value: id,
    });
  };
</script>

<div class="card">
  <div class="card-header">
    <div class="card-header-content">
      <div class="top">
        <p class="title">{title}</p>
        <span>
          {#if solved}
            <svg
              class="checkmark"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#7cc055"
              ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-1.02-4.13h-.71L4 8.6l.71-.71 1.92 1.92 4.2-4.21.71.71-4.56 4.56z"
              /></svg
            >
          {:else}
            <svg
              class="checkmark"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#e46e61"
              ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"
              /></svg
            >
          {/if}
        </span>
      </div>
      <span class="status-pill {difficulty}">{difficulty}</span>
    </div>
    <button class="open-btn" title="Solve the exercise" on:click={openExercise}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        ><path d="M5.56 14L5 13.587V2.393L5.54 2 11 7.627v.827L5.56 14z" /></svg
      >
    </button>
  </div>
</div>

<style>
  .card {
    border-radius: 5px;
    padding: 1rem;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header-content {
    flex-grow: 1;
  }

  .card:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .top {
    display: flex;
    align-items: end;
  }

  .checkmark {
    margin-left: 0.5rem;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    margin-bottom: 4px;
  }

  .open-btn {
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: none;
  }

  .status-pill {
    padding: 3px 6px;
    border-radius: 16px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .easy {
    background-color: #7cc055;
    color: rgb(50, 50, 50);
  }

  .moderate {
    background-color: #e5c366;
    color: rgb(50, 50, 50);
  }

  .hard {
    background-color: #e46e61;
    color: rgb(50, 50, 50);
  }
</style>
