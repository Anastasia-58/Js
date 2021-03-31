Vue.component('search', {
    template: '<input id="search" v-model="search" v-on:input="searchHandler">',
    data() {
        return {
            search: '',
        }
    },
    methods: {
        searchHandler() {
            this.$emit('search', this.search);
        }
    }
})

