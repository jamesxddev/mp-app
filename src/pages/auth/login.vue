<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const username = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()

async function onSignIn() {
  try {
    error.value = ''
    await auth.login(username.value, password.value)
  } catch {
    error.value = 'Invalid credentials'
  }
}
</script>
<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your username below to login to your account.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Username</Label>
        <Input id="email" type="email" placeholder="username" required v-model="username"/>
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required v-model="password"/>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="onSignIn">
        Sign in
      </Button>
    </CardFooter>
  </Card>
</template>
