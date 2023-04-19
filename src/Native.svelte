<script lang="ts">
    import { onMount } from 'svelte'
    import { session, sessions, sessionKit } from './wharf'

    onMount(async () => {
        const autoSession = await sessionKit.restore()
        if (autoSession) {
            session.set(autoSession)
        }
        refreshSessions()
    })

    async function refreshSessions() {
        const response = await sessionKit.getSessions()
        sessions.set(response)
    }

    async function login() {
        const response = await sessionKit.login()
        session.set(response.session)
        refreshSessions()
    }

    function logout() {
        sessionKit.logout($session)
        session.set(undefined)
        refreshSessions()
    }
</script>

<main>
    <button on:click={login}>Login</button>

    {#if $session}
        {$session.actor}
        <button on:click={logout}>Logout</button>
    {/if}
</main>

<style>
</style>
