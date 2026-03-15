<script setup lang="ts">
import AuthService from "../services/auth.service";

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();
const router = useRouter();

async function signUp(e: SubmitEvent) {
  const form = e.target as HTMLFormElement;

  const formData = new FormData(form);

  const newUser = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  if (newUser.password !== newUser.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const response = await AuthService.signUp(newUser);
  if (response.success) {
    alert("Sign up successful. Please log in.");
    form.reset();
  }
}

async function signIn(e: SubmitEvent) {
  const form = e.target as HTMLFormElement;

  const formData = new FormData(form);

  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await AuthService.signIn(signInData);
  if (response.success) {
    // nimadir qilamiz
    const { token, user } = response;
    authStore.setData(token, user);

    router.push("/");
  } else {
    alert(response.message);
  }
}
</script>

<template>
  <div class="main">
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div class="signup">
      <form @submit.prevent="signUp">
        <label for="chk" aria-hidden="true">Sign up</label>

        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
        <input type="email" name="email" placeholder="Email" required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minlength="6"
          maxlength="16"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          minlength="6"
          maxlength="16"
          required
        />

        <button type="submit">Sign up</button>
      </form>
    </div>

    <div class="login">
      <form @submit.prevent="signIn">
        <label for="chk" aria-hidden="true">Sign In</label>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minlength="6"
          maxlength="16"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.main {
  width: 350px;
  height: 570px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;

  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
}
#chk {
  display: none;
}
.signup {
  position: relative;
  width: 100%;
  height: 100%;
}
label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 60%;
  height: 10px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
.login {
  height: 610px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.6);
}

#chk:checked ~ .login {
  transform: translateY(-560px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}
</style>
