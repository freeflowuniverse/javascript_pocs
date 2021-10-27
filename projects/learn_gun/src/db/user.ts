import { writable } from "svelte/store";
import Gun from "gun";
import "gun/sea";
import "gun/axe";

export const db = Gun();
export const user = db.user().recall({ sessionStorage: true });
export const username = writable("");

user.get("alias").on((un) => username.set(un));
(db as any).on("auth", async () => {
  console.log("within auth");
  const alias = (await user.get("alias")) as unknown as string;
  username.set(alias);
});
