<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add a new genus</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Scientific name">
                <b-input
                    type="name"
                    v-model="data.scientific_name">
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="submit">Add</button>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'AddGenusForm',

  data () {
    return {
    	data: {
    		scientific_name: ''
    	}
    }
  },

  methods: {
  	submit() {
      this.$http.post('/genus', {
        ...this.data
      })
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.$buefy.toast.open({
            duration: 3000,
            message: `Status: ${response.status} | Genus posted successfully`,
            position: 'is-top',
            type: 'is-success'
          })
  		    this.$emit('submit', this.data);
  		    this.$parent.close();
        } else {
          return this.$buefy.toast.open({
            duration: 5000,
            message: `Status: ${response.status} | Error posting Genus: ${response.statusText}`,
            position: 'is-top',
            type: 'is-danger'
          })
        }
      })
      .catch(e => {
        return this.$buefy.toast.open({
          duration: 5000,
          message: `Error: ${e.message}`,
          position: 'is-top',
          type: 'is-danger'
        })
      })

  	}
  }
};
</script>

<style lang="css" scoped>
</style>