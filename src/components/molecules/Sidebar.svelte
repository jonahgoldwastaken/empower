<style>
  aside {
    position: relative;
    grid-area: sidebar;
    background: #f3f3f3;
    padding: 1rem;
    overflow-y: scroll;
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    box-shadow: var(--medium-box-shadow);
    z-index: 100;
    animation: sidebar-slide-in 0.4s ease-in-out;
  }
</style>

<aside>
  <slot />
</aside>
