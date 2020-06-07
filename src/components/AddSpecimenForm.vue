<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add new specimen to Species "{{speciesId}}"</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Name">
                <b-input
                    type="name"
                    v-model="data.name">
                </b-input>
            </b-field>
            <b-field label="Birthday date">
                <b-input
                    type="name"
                    v-model="data.birth_date_time">
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="submit">Add Specimen</button>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'AddSpecimenForm',
  props: {
    speciesId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      data: {
        name: '',
        birth_date_time: '',
      }
    }
  },

  methods: {
    submit() {
      fetch('http://localhost:5000/specimen', {
        method: 'POST',
        body: JSON.stringify({...this.data, species: {id: this.speciesId}}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (response.status == 200) {
          this.$buefy.toast.open({
            duration: 3000,
            message: `Status: ${response.status} | Specimen posted successfully`,
            position: 'is-top',
            type: 'is-success'
          })
          this.$emit('submit', this.data);
          this.$parent.close();
        } else {
          console.log(response)
          return this.$buefy.toast.open({
            duration: 5000,
            message: `Status: ${response.status} | Error posting Sepecimen: ${response.statusText}`,
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