<style>
  li {
    
    position: relative;
    margin: 0;
    padding: 1em 1.5em;
    background: var(--grey-blue);
    border-radius: 0.75rem;
    font-size: var(--step-1);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:first-child {
    border: 1px solid black;
  }

  li:before {
    content: '';
    background: url(/notification.svg) no-repeat center/contain;
    position: absolute;
    top: 0.4em;
    right: 0.4em;
    width: 0.7em;
    height: 0.7em;
  }
</style>

<li>
  <span>
    <slot />
  </span>
</li>
