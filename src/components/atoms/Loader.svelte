<script>
  import { onMount } from 'svelte'

  let video

  onMount(() => {
    video.defaultPlaybackRate = 2
  })
</script>

<style>
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  video {
    width: 48rem;
    height: 48rem;
  }
</style>

<div>
  <video bind:this={video} src="/loading.mp4" autoplay muted loop />
  <h1>Loading</h1>
</div>
