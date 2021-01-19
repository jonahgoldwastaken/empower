<style>
  aside {
    position: relative;
    grid-area: sidebar;
    background: #f3f3f3;
    padding: var(--step-4) var(--step-2);
    overflow-y: scroll;
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    box-shadow: var(--medium-box-shadow);
    z-index: 100;
  }
</style>

<aside>
  <slot />
</aside>
