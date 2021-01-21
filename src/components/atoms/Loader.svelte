<script>
  import { onMount } from 'svelte'

  export let noCenter = false
  let video

  onMount(() => {
    video.defaultPlaybackRate = 4
  })
</script>

<style>
  div:not(.no-center) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 0.75rem;
    background: var(--white);
  }

  video {
    max-width: 25rem;
    max-height: 25rem;
    width: 100%;
    height: 100%;
  }
</style>

<div class:no-center={noCenter}>
  <video bind:this={video} src="/loading.mp4" autoplay muted loop />
  <h1><slot>Loading</slot></h1>
</div>
