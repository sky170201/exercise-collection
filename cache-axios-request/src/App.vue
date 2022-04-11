<template>
    <div>
        <h2>App</h2>
        <h3>{{ name }}</h3>
        <button @click="toggle">切换</button>
        <Home v-if="show"/>
        <About v-if="!show"/>
    </div>
</template>

<script>
import Home from '@/views/Home'
import About from '@/views/About'

export default {
    name: 'App',
    components: {Home, About},
    data() {
        return {
            name: 'candy',
            show: true
        }
    },
    methods: {
        toggle() {
            this.show = !this.show
        }
    },
    created() {
        console.log('console app created hook')
    }
}
</script>
<style lang="scss" scoped>
h4 {
    transform: rotate(45deg);
    background-color: aquamarine;
}
</style>