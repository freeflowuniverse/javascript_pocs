<script lang="ts">
  import { onMount } from "svelte";
  import { username, user, db } from "./db/user";
  import Gun, { SEA } from "gun";

  const gun = Gun();
  $: un = $username;

  let name: string = "";
  let password: string = "";
  function onRegister() {
    user.create(name, password, (data) => {
      console.log("from signup", data);
    });
  }
  function onLogin() {
    user.auth(name, password, (data) => {
      console.log("from login", data);
    });
  }

  let message: string = "";
  async function onChat() {
    console.log(un);

    gun
      .get("chat")
      .get(new Date().toISOString())
      .put({
        value: message,
        un,
        sender: {
          username: un,
        },
      });
    message = "";
  }

  onMount(() => {
    gun
      .get("chat")
      .map()
      .once(async (data: any, id) => {
        if (data) {
          console.log({ data, id });
        }
      });
  });
</script>

<div>
  {un}
</div>
<form>
  <div>
    <label for="name-field"> Username: </label>
    <input
      type="text"
      name="name"
      id="name-field"
      bind:value={name}
      placeholder="Name"
    />
  </div>

  <div>
    <label for="password-field"> Password: </label>
    <input
      type="password"
      name="password"
      id="password-field"
      bind:value={password}
      placeholder="Password"
    />
  </div>
  <button type="button" on:click={onRegister}> Signup </button>
  <button type="button" on:click={onLogin}> Login </button>
</form>

<form on:submit|preventDefault={onChat}>
  <div>
    <label for="message"> Message: </label>
    <input type="text" name="message" id="message" bind:value={message} />
  </div>
  <button type="submit"> Send Message </button>
</form>
