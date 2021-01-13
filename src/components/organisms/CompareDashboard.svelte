<style>
  div {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'map map map map'
      'notifications notifications notifications notifications'
      'graph-1 graph-1 table table'
      'graph-2 graph-2 facts facts';
    grid-template-rows: minmax(30rem, 20vh);
    grid-auto-rows: min-content;
    grid-gap: calc(1.5 * var(--step-0));
    background: var(--off-white);
    padding: var(--step-2);
    overflow: hidden scroll;
  }
</style>

<div>
  <slot />
</div>
