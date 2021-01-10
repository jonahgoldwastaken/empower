<style>
  section {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    border-radius: 0.75rem;
    background: var(--white);
    padding: var(--step-0);
    box-shadow: var(--light-box-shadow);
  }

  h3 {
    font-size: var(--step-1);
    font-family: 'Roboto', sans-serif;
    margin: 0;
    margin-bottom: 1em;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: var(--step-0);
  }

  li:before {
    content: '';
    display: inline-block;
    border-radius: 0.125em;
    height: 0.75em;
    width: 1.5em;
    margin-right: 1.125em;
    vertical-align: middle;
  }

  li:nth-of-type(1):before {
    background: var(--orange);
  }

  li:nth-of-type(2):before {
    background: var(--muted-orange);
  }

  li:nth-of-type(3):before {
    background: var(--yellow);
  }

  li:nth-of-type(4):before {
    background: var(--light-green);
  }

  li:nth-of-type(5):before {
    background: var(--dark-green);
  }
</style>

<section>
  <h3>Legend</h3>
  <ol>
    <li>&lt; 200 TJ</li>
    <li>200 &lt; 400 TJ</li>
    <li>400 &lt; 600 TJ</li>
    <li>600 &lt; 800 TJ</li>
    <li>&gt;= 800 TJ</li>
  </ol>
</section>
