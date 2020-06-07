<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add new species to Genus "{{genusId}}"</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Scientific name">
                <b-input
                    type="name"
                    v-model="data.scientific_name">
                </b-input>
            </b-field>
            <b-field label="Common name">
                <b-input
                    type="name"
                    v-model="data.common_name">
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="submit">Add Species</button>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'AddSpeciesForm',
  props: {
    genusId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
    	data: {
    		scientific_name: '',
        common_name: '',
    	}
    }
  },

  methods: {
  	submit() {
  		fetch('http://localhost:5000/species', {
        method: 'POST',
        body: JSON.stringify({...this.data, genus: {id: this.genusId}}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (response.status == 200) {
          this.$buefy.toast.open({
            duration: 3000,
            message: `Status: ${response.status} | Species posted successfully`,
            position: 'is-top',
            type: 'is-success'
          })
          this.$emit('submit', this.data);
          this.$parent.close();
        } else {
          console.log(response)
          return this.$buefy.toast.open({
            duration: 5000,
            message: `Status: ${response.status} | Error posting Sepecies: ${response.statusText}`,
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