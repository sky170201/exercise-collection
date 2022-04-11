<template>
    <div>
        Home
    </div>
</template>

<script>
import request from '@/api'
export default {
    components: {

    },
    data () {
        return {

        };
    },
    methods: {
        async getCacheRequest() {
            const res = await request({
                method: 'get',
                url: '/home'
            })
            console.log(res)
        }
    },
    computed: {

    },
    created() {
        console.log('Home')
        this.getCacheRequest()
    }
}
</script>
<style lang='scss' scoped>
</style>