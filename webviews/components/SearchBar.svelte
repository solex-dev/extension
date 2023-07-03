<script lang="ts">
  let menuOpen = false;
</script>

<div class="search">
  <input type="text" placeholder="Search for an exercise" />
  <section class="dropdown">
    <button on:click={() => (menuOpen = !menuOpen)}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        ><path d="M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z" /></svg
      >
    </button>
    {#if menuOpen}
      <div id="dropdown" class="dropdown-content">
        <ul>
          <li>
            <button class="item">Button 1</button>
          </li>
          <li>
            <button class="item">Button 2</button>
          </li>
          <li>
            <button class="item">Button 3</button>
          </li>
        </ul>
      </div>
    {/if}
  </section>
</div>

<style>
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  input {
    border: none;
    border-radius: 20px;
    padding: 0.5rem;
    padding-left: 1rem;
    width: 80%;
    font-size: 1rem;
    outline: none;
    margin-left: 2%;
  }
  button {
    border: none;
    width: 32px;
    height: 32px;
    background: none;
    cursor: pointer;
    margin-right: 3%;
  }
  .dropdown {
    position: relative;
    margin-right: 3%;
  }
  .dropdown-content {
    position: absolute;
    width: 144px;
    top: 100%;
    right: 0;
    border-radius: 4px;
    border: rgb(106, 105, 105) 0.5px solid;
    background: var(--vscode-dropdown-background);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    z-index: 1;
  }
  .item {
    border: rgb(106, 105, 105) 0.5px solid;
    border-radius: 4px;
    width: 100%;
    height: 32px;
    cursor: pointer;
    color: white;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
