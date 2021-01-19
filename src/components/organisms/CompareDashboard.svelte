<style>
  div {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 30rem repeat(2, min-content) 4rem repeat(2, min-content);
    grid-template-areas:
      'map map map map'
      'notifications notifications notifications notifications'
      'graph-1 graph-1 table table'
      'graph-1 graph-1 facts facts'
      'graph-2 graph-2 facts facts'
      'button button button button';
    grid-auto-rows: min-content;
    grid-gap: calc(1.5 * var(--step-0));
    background: var(--off-white);
    padding: var(--step-2);
    position: relative;
  }
</style>

<div>
  <slot />
</div>
