<svelte:options tag="app-root" />

<script lang="ts">
  //   import snarkdown from "snarkdown";
  import marked from "marked";

  const md = `
# Hello world
<md-counter></md-counter>
    `;

  console.log();

  //   _marked.setOptions({
  //     sanitize: false,
  //   });
  //   console.log(
  //     _marked.parseInline("", {
  //       sanitize: false,
  //     })
  //   );

  //   console.log(
  //     _marked.parseInline(md, {
  //       sanitize: false,
  //     })
  //   );
</script>

<h1>{@html marked.parse(md, { sanitize: false })}</h1>
